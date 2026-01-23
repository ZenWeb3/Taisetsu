import { Context, Markup } from "telegraf";
import { apiStorage } from "../services/storage";
import { config } from "../config";

// Track conversation state
const userStates = new Map<
  number,
  {
    step: "awaiting_url" | "awaiting_price";
    url?: string;
  }
>();

export async function createCommand(ctx: Context) {
  const userId = ctx.from?.id;
  if (!userId) return;

  userStates.set(userId, { step: "awaiting_url" });

  await ctx.replyWithMarkdown(`
🔧 *Create Payment-Gated API*

Please send me your API endpoint URL.

*Example:*
\`https://api.example.com/v1/data\`

_Make sure your API is publicly accessible._
  `);
}

export async function handleCreateFlow(ctx: Context) {
  const userId = ctx.from?.id;
  if (!userId) return false;

  const state = userStates.get(userId);
  if (!state) return false;

  const message = ctx.message;
  if (!message || !("text" in message)) return false;

  const text = message.text;

  if (state.step === "awaiting_url") {
    // Validate URL
    if (!isValidUrl(text)) {
      await ctx.reply(
        "❌ Invalid URL. Please send a valid API endpoint URL (must start with http:// or https://)",
      );
      return true;
    }

    state.url = text;
    state.step = "awaiting_price";
    userStates.set(userId, state);

    await ctx.replyWithMarkdown(
      `
✅ API URL received!

Now, set the *price per request* in USDC.

*Examples:*
• \`0.001\` - $0.001 per request
• \`0.01\` - $0.01 per request  
• \`0.1\` - $0.10 per request

_Enter the price:_
    `,
      Markup.inlineKeyboard([
        [
          Markup.button.callback("$0.001", "price_0.001"),
          Markup.button.callback("$0.01", "price_0.01"),
          Markup.button.callback("$0.1", "price_0.1"),
        ],
      ]),
    );

    return true;
  }

  if (state.step === "awaiting_price") {
    const price = parseFloat(text);

    if (isNaN(price) || price <= 0 || price > 100) {
      await ctx.reply(
        "❌ Invalid price. Enter a number between 0.0001 and 100 USDC.",
      );
      return true;
    }

    await createApiEndpoint(ctx, userId, state.url!, price.toString());
    userStates.delete(userId);
    return true;
  }

  return false;
}

export async function handlePriceCallback(ctx: Context) {
  const userId = ctx.from?.id;
  if (!userId) return;

  const state = userStates.get(userId);
  if (!state || !state.url) return;

  const callbackQuery = ctx.callbackQuery;
  if (!callbackQuery || !("data" in callbackQuery)) return;

  const price = callbackQuery.data.replace("price_", "");

  await ctx.answerCbQuery();
  await createApiEndpoint(ctx, userId, state.url, price);
  userStates.delete(userId);
}

async function createApiEndpoint(
  ctx: Context,
  userId: number,
  url: string,
  price: string,
) {
  const username = ctx.from?.username;

  const endpoint = apiStorage.createEndpoint(userId, username, url, price);

  const proxyUrl = `${config.proxyBaseUrl}${endpoint.proxyPath}`;

  await ctx.replyWithMarkdown(`
🎉 *API Endpoint Created!*

*Original URL:*
\`${url}\`

*Payment-Gated URL:*
\`${proxyUrl}\`

*Price:* $${price} USDC per request

*Endpoint ID:* \`${endpoint.id}\`

---

*How to use:*
Clients must include the x402 payment header when calling your proxied URL. The payment is automatically verified on Cronos before forwarding the request.

*Test it:*
\`\`\`
curl -X GET "${proxyUrl}" \\
  -H "X-402-Payment: <payment_token>"
\`\`\`

Track earnings with /earnings 📊
  `);
}

function isValidUrl(string: string): boolean {
  try {
    const url = new URL(string);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function clearUserState(userId: number) {
  userStates.delete(userId);
}
