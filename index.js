const { Telegraf } = require('telegraf');

// Bot token is read from environment variables (set in Railway → Variables)
const BOT_TOKEN = process.env.BOT_TOKEN;

if (!BOT_TOKEN) {
  console.error('Missing BOT_TOKEN environment variable. Set it in Railway before deploying.');
  process.exit(1);
}

const bot = new Telegraf(BOT_TOKEN);

// ---------- Helper functions ----------

function countText(text) {
  const words = text.split(/\s+/).filter(Boolean).length;
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, '').length;
  return { words, characters, charactersNoSpaces };
}

// ---------- Commands ----------

bot.start((ctx) => {
  ctx.reply(
    `Welcome to Clement's Tools Bot! 🛠️\n\n` +
    `Available commands:\n` +
    `/count <text> - Count words and characters\n` +
    `/help - Show this message again`
  );
});

bot.help((ctx) => {
  ctx.reply(
    `Commands:\n` +
    `/count <text> - Count words and characters\n\n` +
    `More tools coming soon.`
  );
});

bot.command('count', (ctx) => {
  const text = ctx.message.text.replace('/count', '').trim();

  if (!text) {
    return ctx.reply('Please send text after the command.\nExample: /count Hello world');
  }

  const { words, characters, charactersNoSpaces } = countText(text);

  ctx.reply(
    `📊 Text stats:\n` +
    `Words: ${words}\n` +
    `Characters (with spaces): ${characters}\n` +
    `Characters (no spaces): ${charactersNoSpaces}`
  );
});

// Any plain text message also gets a quick count
bot.on('text', (ctx) => {
  const { words, characters } = countText(ctx.message.text);
  ctx.reply(`Words: ${words} | Characters: ${characters}\n\nTip: use /count for a full breakdown.`);
});

// ---------- Error handling ----------

bot.catch((err, ctx) => {
  console.error(`Error while handling update ${ctx.updateType}:`, err);
});

// ---------- Launch ----------

bot.launch();
console.log('Bot is running...');

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
