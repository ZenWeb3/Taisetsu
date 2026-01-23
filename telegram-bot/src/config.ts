import dotenv from 'dotenv';
dotenv.config();

export const config = {
  // Telegram
  botToken: process.env.BOT_TOKEN || '',
  
  // Cronos Testnet
  cronosRpcUrl: process.env.CRONOS_RPC_URL || 'https://evm-t3.cronos.org',
  chainId: parseInt(process.env.CHAIN_ID || '338'),
  
  // Wallet
  privateKey: process.env.PRIVATE_KEY || '',
  
  // Proxy
  proxyPort: parseInt(process.env.PROXY_PORT || '3000'),
  proxyBaseUrl: process.env.PROXY_BASE_URL || 'http://localhost:3000',
  
  // Crypto.com
  cryptoComApiKey: process.env.CRYPTOCOM_API_KEY || '',
};