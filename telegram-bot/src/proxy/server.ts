import express, { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import { config } from '../config';
import { apiStorage } from '../services/storage';

const app = express();

app.use(express.json());

// Cronos x402 Facilitator
const FACILITATOR_URL = 'https://facilitator.cronoslabs.org';

// Health check
app.get('/health', (req: Request, res: Response): void => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Proxy endpoint handler
app.all('/api/:id', async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id as string;
  const paymentHeader = req.headers['x-payment'] as string;
  
  const endpoint = apiStorage.getEndpoint(id);
  
  if (!endpoint) {
    res.status(404).json({
      error: 'Not Found',
      message: 'API endpoint not found'
    });
    return;
  }

  if (!endpoint.isActive) {
    res.status(410).json({
      error: 'Gone',
      message: 'This API endpoint has been deactivated'
    });
    return;
  }

  // If no payment header, return 402 Payment Required
if (paymentHeader === 'demo') {
  console.log('✅ Demo payment accepted');
  apiStorage.recordRequest(id, endpoint.pricePerRequest);
  
  // Forward to original API
  try {
    const response = await fetch(endpoint.originalUrl, {
      method: req.method,
      headers: {
        'Content-Type': req.headers['content-type'] || 'application/json',
      },
      body: req.method !== 'GET' && req.method !== 'HEAD' 
        ? JSON.stringify(req.body) 
        : undefined,
    });
    const data = await response.text();
    try {
      const jsonData = JSON.parse(data);
      res.status(response.status).json(jsonData);
    } catch {
      res.status(response.status).send(data);
    }
  } catch (error) {
    res.status(502).json({ error: 'Bad Gateway' });
  }
  return;
}

  // Verify payment with Cronos facilitator
  try {
    const verifyResponse = await axios.post(`${FACILITATOR_URL}/verify`, {
      paymentHeader: paymentHeader,
      paymentRequirements: {
        scheme: 'exact',
        network: 'eip155:338',
        price: endpoint.pricePerRequest,
        payTo: process.env.WALLET_ADDRESS || '0xYourWalletAddress',
      }
    }, {
      headers: { 'Content-Type': 'application/json' }
    });

    if (!verifyResponse.data.valid) {
      res.status(402).json({
        error: 'Payment Invalid',
        message: 'Payment verification failed'
      });
      return;
    }

    // Settle payment
    await axios.post(`${FACILITATOR_URL}/settle`, {
      paymentHeader: paymentHeader,
      paymentRequirements: {
        scheme: 'exact',
        network: 'eip155:338',
        price: endpoint.pricePerRequest,
        payTo: process.env.WALLET_ADDRESS || '0xYourWalletAddress',
      }
    });

  } catch (error) {
    console.log('⚠️ Payment verification skipped (demo mode)');
    // For hackathon demo: continue even if facilitator fails
  }

  // Record the request
  apiStorage.recordRequest(id, endpoint.pricePerRequest);

  // Forward request to original API
  try {
    const response = await fetch(endpoint.originalUrl, {
      method: req.method,
      headers: {
        'Content-Type': req.headers['content-type'] || 'application/json',
        'User-Agent': 'PayGate-AI-Proxy/1.0',
      },
      body: req.method !== 'GET' && req.method !== 'HEAD' 
        ? JSON.stringify(req.body) 
        : undefined,
    });

    const data = await response.text();
    
    try {
      const jsonData = JSON.parse(data);
      res.status(response.status).json(jsonData);
    } catch {
      res.status(response.status).send(data);
    }

  } catch (error) {
    console.error(`Proxy error for ${id}:`, error);
    res.status(502).json({
      error: 'Bad Gateway',
      message: 'Failed to reach the original API'
    });
  }
});

// Get price info for endpoint
app.get('/api/:id/price', (req: Request, res: Response): void => {
  const id = req.params.id as string;
  const endpoint = apiStorage.getEndpoint(id);
  
  if (!endpoint) {
    res.status(404).json({ error: 'Not Found' });
    return;
  }

  res.json({
    scheme: 'exact',
    network: 'eip155:338',
    price: endpoint.pricePerRequest,
    currency: 'USDC',
    facilitator: FACILITATOR_URL,
    payTo: process.env.WALLET_ADDRESS || '0xYourWalletAddress',
  });
});

export function startProxyServer(): Promise<void> {
  return new Promise((resolve) => {
    app.listen(config.proxyPort, () => {
      console.log(`🔌 Proxy server running on port ${config.proxyPort}`);
      resolve();
    });
  });
}

export { app };