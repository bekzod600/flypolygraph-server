const { bot } = require("../core/bot");
const { keyboards } = require("../lib/keyboards");
const { messages } = require("../lib/messages");

bot.start((ctx) => {
  ctx.replyWithHTML(messages["start"], keyboards["start"]);
});
