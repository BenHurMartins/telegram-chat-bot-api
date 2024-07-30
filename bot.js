const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token);

bot.setWebHook(`${process.env.TELEGRAM_WEB_APP_URL}/bot${token}`);

app.use(bodyParser.json());

app.post(`/bot${token}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

bot.onText(/\/start/, (msg) => {
  console.log("🚀 ~ bot.onText ~ msg:", msg);
  const chatId = msg.chat.id;
  const resp = "Click the button below to play the game!";
  const gameUrl = "https://pedro-faz-3.vercel.app";
  const options = {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Play Game 🎮", web_app: { url: gameUrl } }], // Use web_app instead of url
      ],
    },
  };

  bot.sendMessage(chatId, resp, options);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
