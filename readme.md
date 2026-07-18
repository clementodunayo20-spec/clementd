# @clementDbot

Telegram bot with utility tools (starting with word/character counter), deployed via Railway from a GitHub repo.

## 1. Create the bot on Telegram

1. Message **@BotFather** on Telegram.
2. Send `/newbot`.
3. Pick a display name, e.g. `Clement Tools`.
4. Pick the username `clementDbot` (must end in "bot"; if taken, try `clementDToolsBot`).
5. Save the token BotFather gives you — you'll need it for Railway.

## 2. Push to GitHub

```bash
cd clementDbot
git init
git add .
git commit -m "Initial bot setup"
git branch -M main
git remote add origin https://github.com/<your-username>/clementDbot.git
git push -u origin main
```

Create the empty repo on GitHub first (github.com/new, no README), then run the above.

## 3. Deploy on Railway

1. Go to [railway.app](https://railway.app), sign in with GitHub.
2. **New Project → Deploy from GitHub repo** → select `clementDbot`.
3. Open **Variables**, add `BOT_TOKEN` = your token from BotFather.
4. Railway auto-detects Node.js and runs `npm start`.
5. Check **Deployments → Logs** for `Bot is running...`.

## 4. Test it

Message `@clementDbot` on Telegram, send `/start`.

## Adding more tools

Add new `bot.command('name', (ctx) => {...})` blocks in `index.js`, commit, push — Railway redeploys automatically on every push to `main`.

## Local development

```bash
npm install
BOT_TOKEN=your_token_here npm start
```
