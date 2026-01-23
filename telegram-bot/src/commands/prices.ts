import { Context } from 'telegraf';
import { cryptoComService } from '../services/crypto';

export async function pricesCommand(ctx: Context) {
  await ctx.reply('📊 Fetching live prices...');

  try {
    const prices = await cryptoComService.getMultiplePrices();
    
    if (prices.size === 0) {
      await ctx.reply('❌ Unable to fetch prices. Please try again later.');
      return;
    }

    const message = cryptoComService.formatPriceMessage(prices);
    await ctx.replyWithMarkdown(message + '\n\n_Data from Crypto.com_');
  } catch (error) {
    console.error('Price fetch error:', error);
    await ctx.reply('❌ Error fetching prices. Please try again.');
  }
}

export async function statusCommand(ctx: Context) {
  const startTime = Date.now();
  
  // Check Crypto.com API
  const croPrice = await cryptoComService.getPrice('CRO_USDC');
  const apiLatency = Date.now() - startTime;

  const statusMessage = `
🤖 *PayGate AI Status*

*Bot:* 🟢 Online
*Crypto.com API:* ${croPrice ? '🟢' : '🔴'} ${croPrice ? 'Connected' : 'Unavailable'}
*API Latency:* ${apiLatency}ms
*Network:* Cronos Testnet (Chain ID: 338)

*Version:* 1.0.0
*Uptime:* ${getUptime()}
  `;

  await ctx.replyWithMarkdown(statusMessage);
}

function getUptime(): string {
  const uptime = process.uptime();
  const hours = Math.floor(uptime / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);
  const seconds = Math.floor(uptime % 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  } else {
    return `${seconds}s`;
  }
}