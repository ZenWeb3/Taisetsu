import { Context } from 'telegraf';

export async function startCommand(ctx: Context) {
  const username = ctx.from?.first_name || 'Developer';
  
  const welcomeMessage = `
🚀 *Welcome to PayGate AI, ${username}!*

I help developers monetize their APIs instantly using x402 payments on Cronos.

*How it works:*
1️⃣ Give me your API endpoint
2️⃣ I wrap it with x402 payment middleware
3️⃣ You get a payment-gated proxy URL
4️⃣ Earn USDC on every request!

*Commands:*
/create - Create a new paid API endpoint
/myapis - View your monetized APIs
/earnings - Check your earnings & analytics
/withdraw - Withdraw your USDC earnings
/prices - View current crypto prices
/help - Show this help message

Ready to monetize? Use /create to get started! 💰
  `;

  await ctx.replyWithMarkdown(welcomeMessage);
}

export async function helpCommand(ctx: Context) {
  const helpMessage = `
📖 *PayGate AI - Help*

*Available Commands:*

🔧 *API Management*
/create - Create a payment-gated API
/myapis - List all your APIs
/delete <id> - Deactivate an API

💰 *Earnings*
/earnings - View earnings dashboard
/withdraw - Withdraw USDC to wallet
/prices - Live crypto prices

ℹ️ *Info*
/help - This help message
/status - Bot & network status

*How Payment Works:*
When someone calls your proxied API, they must include an x402 payment header. The payment is verified on Cronos, then the request is forwarded to your original API.

*Need help?* Contact @YourSupportHandle
  `;

  await ctx.replyWithMarkdown(helpMessage);
}