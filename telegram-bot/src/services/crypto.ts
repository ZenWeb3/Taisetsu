interface PriceData {
  symbol: string;
  price: string;
  change24h: string;
}

interface CryptoComResponse {
  result?: {
    data?: {
      i: string;
      a: string;
      c?: string;
    };
  };
}

class CryptoComService {
  private baseUrl = "https://api.crypto.com/v2";

  async getPrice(symbol: string = "CRO_USDC"): Promise<PriceData | null> {
    try {
      const response = await fetch(
        `${this.baseUrl}/public/get-ticker?instrument_name=${symbol}`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch price");
      }

      const data = (await response.json()) as CryptoComResponse;

      if (data.result?.data) {
        const ticker = data.result.data;
        return {
          symbol: ticker.i,
          price: ticker.a,
          change24h: ticker.c || "0",
        };
      }

      return null;
    } catch (error) {
      console.error("CryptoCom API error:", error);
      return null;
    }
  }

  async getMultiplePrices(): Promise<Map<string, PriceData>> {
    const symbols = ["CRO_USDC", "BTC_USDC", "ETH_USDC"];
    const prices = new Map<string, PriceData>();

    for (const symbol of symbols) {
      const price = await this.getPrice(symbol);
      if (price) {
        prices.set(symbol, price);
      }
    }

    return prices;
  }

  formatPriceMessage(prices: Map<string, PriceData>): string {
    let message = "📊 *Market Prices*\n\n";

    prices.forEach((data, symbol) => {
      const displaySymbol = symbol.replace("_USDC", "");
      const changeEmoji = parseFloat(data.change24h) >= 0 ? "🟢" : "🔴";
      message += `${displaySymbol}: $${parseFloat(data.price).toFixed(4)} ${changeEmoji}\n`;
    });

    return message;
  }
}

export const cryptoComService = new CryptoComService();
