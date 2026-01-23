import { Context, Markup } from 'telegraf';
import { apiStorage } from '../services/storage';

// Track withdrawal states
const withdrawStates = new Map<number, {
  step: 'awaiting_address' | 'confirming';
  address?: string;
  amount?: string;
}>();

export async function withdrawCommand(ctx: Context) {
  const userId = ctx.from?.id;
  if (!userId) return;

  const stats = apiStorage.getUserStats(userId);
  
  if (parseFloat(stats.pendingWithdrawal) <= 0) {
    await ctx.replyWithMarkdown(`
💸 *Withdraw USDC*

You don't have any earnings to withdraw yet.

Create APIs with /create and start earning! 🚀
    `);
    return;
  }

  withdrawStates.set(userId, { step: 'awaiting_address', amount: stats.pendingWithdrawal });

  await ctx.replyWithMarkdown(`
💸 *Withdraw USDC*

*Available:* $${stats.pendingWithdrawal} USDC

Please send your Cronos wallet address to receive the funds.

*Example:*
\`0x1234...abcd\`

⚠️ _Make sure this is a Cronos-compatible address!_
  `, Markup.inlineKeyboard([
    [Markup.button.callback('❌ Cancel', 'withdraw_cancel')]
  ]));
}

export async function handleWithdrawFlow(ctx: Context): Promise<boolean> {
  const userId = ctx.from?.id;
  if (!userId) return false;

  const state = withdrawStates.get(userId);
  if (!state) return false;

  const message = ctx.message;
  if (!message || !('text' in message)) return false;
  
  const text = message.text;

  if (state.step === 'awaiting_address') {
    // Validate Ethereum/Cronos address
    if (!isValidAddress(text)) {
      await ctx.reply('❌ Invalid address. Please send a valid Cronos wallet address (starts with 0x).');
      return true;
    }

    state.address = text;
    state.step = 'confirming';
    withdrawStates.set(userId, state);

    await ctx.replyWithMarkdown(`
⚠️ *Confirm Withdrawal*

*Amount:* $${state.amount} USDC
*To Address:* \`${text}\`
*Network:* Cronos Testnet

Are you sure you want to proceed?
    `, Markup.inlineKeyboard([
      [
        Markup.button.callback('✅ Confirm', 'withdraw_confirm'),
        Markup.button.callback('❌ Cancel', 'withdraw_cancel'),
      ]
    ]));

    return true;
  }

  return false;
}

export async function handleWithdrawCallback(ctx: Context) {
  const userId = ctx.from?.id;
  if (!userId) return;

  const callbackQuery = ctx.callbackQuery;
  if (!callbackQuery || !('data' in callbackQuery)) return;

  const action = callbackQuery.data;

  if (action === 'withdraw_cancel') {
    withdrawStates.delete(userId);
    await ctx.answerCbQuery('Withdrawal cancelled');
    await ctx.editMessageText('❌ Withdrawal cancelled.');
    return;
  }

  if (action === 'withdraw_confirm') {
    const state = withdrawStates.get(userId);
    if (!state || !state.address || !state.amount) {
      await ctx.answerCbQuery('Session expired. Please try again.');
      return;
    }

    await ctx.answerCbQuery('Processing withdrawal...');

    // Simulate withdrawal (in production, this would trigger actual blockchain tx)
    const txHash = generateMockTxHash();

    await ctx.editMessageText(`
✅ *Withdrawal Initiated!*

*Amount:* $${state.amount} USDC
*To:* \`${state.address}\`
*Network:* Cronos Testnet

*Transaction Hash:*
\`${txHash}\`

🔗 [View on Explorer](https://testnet.cronoscan.com/tx/${txHash})

_Funds will arrive in 1-2 minutes._
    `, { parse_mode: 'Markdown' });

    withdrawStates.delete(userId);
  }
}

function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

function generateMockTxHash(): string {
  const chars = '0123456789abcdef';
  let hash = '0x';
  for (let i = 0; i < 64; i++) {
    hash += chars[Math.floor(Math.random() * chars.length)];
  }
  return hash;
}

export function clearWithdrawState(userId: number) {
  withdrawStates.delete(userId);
}