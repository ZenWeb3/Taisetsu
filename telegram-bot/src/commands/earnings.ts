import { Context } from 'telegraf';
import { apiStorage } from '../services/storage';
import { cryptoComService } from '../services/crypto';

export async function earningsCommand(ctx: Context) {
  const userId = ctx.from?.id;
  if (!userId) return;

  const stats = apiStorage.getUserStats(userId);
  const endpoints = apiStorage.getUserEndpoints(userId);

  if (endpoints.length === 0) {
    await ctx.replyWithMarkdown(`
📊 *Earnings Dashboard*

You haven't created any API endpoints yet.

Use /create to monetize your first API! 🚀
    `);
    return;
  }

  // Get current prices for context
  const croPrice = await cryptoComService.getPrice('CRO_USDC');
  
  let message = `
📊 *Earnings Dashboard*

💰 *Total Earnings:* $${stats.totalEarnings} USDC
📡 *Total Requests:* ${stats.totalRequests.toLocaleString()}
🔗 *Active Endpoints:* ${stats.totalEndpoints}
💵 *Available to Withdraw:* $${stats.pendingWithdrawal} USDC

---

*Your Endpoints:*
`;

  endpoints.forEach((ep, index) => {
    const status = ep.isActive ? '🟢' : '🔴';
    message += `
${index + 1}. ${status} \`${ep.id}\`
   💵 $${ep.pricePerRequest}/req • ${ep.totalRequests} calls • $${ep.totalEarnings} earned
`;
  });

  if (croPrice) {
    message += `\n---\n📈 *CRO Price:* $${parseFloat(croPrice.price).toFixed(4)} USDC`;
  }

  message += `\n\nUse /withdraw to cash out your earnings 💸`;

  await ctx.replyWithMarkdown(message);
}

export async function myApisCommand(ctx: Context) {
  const userId = ctx.from?.id;
  if (!userId) return;

  const endpoints = apiStorage.getUserEndpoints(userId);

  if (endpoints.length === 0) {
    await ctx.replyWithMarkdown(`
🔗 *My APIs*

No APIs created yet. Use /create to get started!
    `);
    return;
  }

  let message = `🔗 *My Monetized APIs*\n\n`;

  endpoints.forEach((ep, index) => {
    const status = ep.isActive ? '🟢 Active' : '🔴 Inactive';
    const created = ep.createdAt.toLocaleDateString();
    
    message += `
*${index + 1}. Endpoint \`${ep.id}\`*
├ Status: ${status}
├ Price: $${ep.pricePerRequest} USDC/request
├ Requests: ${ep.totalRequests.toLocaleString()}
├ Earned: $${ep.totalEarnings} USDC
├ Created: ${created}
└ URL: \`${ep.originalUrl.slice(0, 40)}...\`

`;
  });

  message += `\n_Use /delete <id> to deactivate an endpoint_`;

  await ctx.replyWithMarkdown(message);
}