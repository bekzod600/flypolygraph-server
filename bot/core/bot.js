const { Telegraf } = require("telegraf");

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.launch().then(() => console.log("Telegram bot ishga tushdi."));

module.exports = { bot };
