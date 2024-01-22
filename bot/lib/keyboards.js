const { Markup } = require("telegraf");
const web_link = "https://sq-market-client.vercel.app/";

const keyboards = {
  start: Markup.keyboard([[Markup.button.webApp("Order Food", web_link)]]).resize(),
};

module.exports = { keyboards };
