const { Markup } = require("telegraf");
const web_link = process.env.WEBAPP_LINK;

const keyboards = {
  start: Markup.keyboard([
    [Markup.button.webApp("Order Food", web_link)],
  ]).resize(),
};

module.exports = { keyboards };
