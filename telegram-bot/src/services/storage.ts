import { v4 as uuidv4 } from 'uuid';

export interface ApiEndpoint {
  id: string;
  userId: number;
  username?: string;
  originalUrl: string;
  proxyPath: string;
  pricePerRequest: string; // in USDC
  totalRequests: number;
  totalEarnings: string;
  createdAt: Date;
  isActive: boolean;
}

export interface UserStats {
  totalEndpoints: number;
  totalRequests: number;
  totalEarnings: string;
  pendingWithdrawal: string;
}

// In-memory storage (replace with DB in production)
class ApiStorage {
  private endpoints: Map<string, ApiEndpoint> = new Map();
  private userEndpoints: Map<number, string[]> = new Map();

  createEndpoint(
    userId: number,
    username: string | undefined,
    originalUrl: string,
    pricePerRequest: string
  ): ApiEndpoint {
    const id = uuidv4().slice(0, 8);
    const proxyPath = `/api/${id}`;
    
    const endpoint: ApiEndpoint = {
      id,
      userId,
      username,
      originalUrl,
      proxyPath,
      pricePerRequest,
      totalRequests: 0,
      totalEarnings: '0',
      createdAt: new Date(),
      isActive: true,
    };

    this.endpoints.set(id, endpoint);
    
    const userApis = this.userEndpoints.get(userId) || [];
    userApis.push(id);
    this.userEndpoints.set(userId, userApis);

    return endpoint;
  }

  getEndpoint(id: string): ApiEndpoint | undefined {
    return this.endpoints.get(id);
  }

  getEndpointByPath(path: string): ApiEndpoint | undefined {
    const id = path.replace('/api/', '');
    return this.endpoints.get(id);
  }

  getUserEndpoints(userId: number): ApiEndpoint[] {
    const ids = this.userEndpoints.get(userId) || [];
    return ids.map(id => this.endpoints.get(id)!).filter(Boolean);
  }

  getUserStats(userId: number): UserStats {
    const endpoints = this.getUserEndpoints(userId);
    
    const totalEarnings = endpoints.reduce(
      (sum, ep) => sum + parseFloat(ep.totalEarnings),
      0
    );

    return {
      totalEndpoints: endpoints.length,
      totalRequests: endpoints.reduce((sum, ep) => sum + ep.totalRequests, 0),
      totalEarnings: totalEarnings.toFixed(6),
      pendingWithdrawal: totalEarnings.toFixed(6), // simplified
    };
  }

  recordRequest(id: string, payment: string): void {
    const endpoint = this.endpoints.get(id);
    if (endpoint) {
      endpoint.totalRequests += 1;
      endpoint.totalEarnings = (
        parseFloat(endpoint.totalEarnings) + parseFloat(payment)
      ).toFixed(6);
    }
  }

  deactivateEndpoint(id: string): boolean {
    const endpoint = this.endpoints.get(id);
    if (endpoint) {
      endpoint.isActive = false;
      return true;
    }
    return false;
  }
}

export const apiStorage = new ApiStorage();