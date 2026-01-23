import { Telegraf } from 'telegraf';
import { config } from './config';
import { startCommand, helpCommand } from './commands/start';
import { createCommand, handleCreateFlow, handlePriceCallback } from './commands/create';
import { earningsCommand, myApisCommand } from './commands/earnings';
import { withdrawCommand, handleWithdrawFlow, handleWithdrawCallback } from './commands/withdraw';
import { pricesCommand, statusCommand } from './commands/prices';
import { startProxyServer } from './proxy/server';
import { apiStorage } from './services/storage';

// Validate config
if (!config.botToken) {
  console.error('❌ BOT_TOKEN is required. Set it in .env file.');
  process.exit(1);
}

const bot = new Telegraf(config.botToken);

// Commands
bot.command('start', startCommand);
bot.command('help', helpCommand);
bot.command('create', createCommand);
bot.command('myapis', myApisCommand);
bot.command('earnings', earningsCommand);
bot.command('withdraw', withdrawCommand);
bot.command('prices', pricesCommand);
bot.command('status', statusCommand);

// Delete endpoint command
bot.command('delete', async (ctx) => {
  const args = ctx.message.text.split(' ');
  if (args.length < 2) {
    await ctx.reply('Usage: /delete <endpoint_id>');
    return;
  }
  
  const id = args[1];
  const endpoint = apiStorage.getEndpoint(id);
  
  if (!endpoint || endpoint.userId !== ctx.from?.id) {
    await ctx.reply('❌ Endpoint not found or you don\'t have permission to delete it.');
    return;
  }
  
  apiStorage.deactivateEndpoint(id);
  await ctx.replyWithMarkdown(`✅ Endpoint \`${id}\` has been deactivated.`);
});

// Callback queries (button clicks)
bot.action(/^price_/, handlePriceCallback);
bot.action(/^withdraw_/, handleWithdrawCallback);

// Handle text messages for multi-step flows
bot.on('text', async (ctx, next) => {
  // Check if user is in a create flow
  const handledCreate = await handleCreateFlow(ctx);
  if (handledCreate) return;
  
  // Check if user is in a withdraw flow
  const handledWithdraw = await handleWithdrawFlow(ctx);
  if (handledWithdraw) return;
  
  // Not in any flow, continue to next handler
  await next();
});

// Handle unknown commands
bot.on('text', async (ctx) => {
  const text = ctx.message.text;
  if (text.startsWith('/')) {
    await ctx.reply(`Unknown command. Use /help to see available commands.`);
  }
});

// Error handling
bot.catch((err, ctx) => {
  console.error(`Error for ${ctx.updateType}:`, err);
  ctx.reply('⚠️ An error occurred. Please try again.');
});

// Graceful shutdown
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

// Start everything
async function main() {
  console.log('🚀 Starting PayGate AI...\n');
  
  // Start proxy server
  await startProxyServer();
  
  // Launch bot
  await bot.launch();
  console.log('🤖 Telegram bot is running!');
  console.log(`📡 Proxy URL: ${config.proxyBaseUrl}`);
  console.log('\n✅ PayGate AI is ready!\n');
}

main().catch((err) => {
  console.error('Failed to start:', err);
  process.exit(1);
});