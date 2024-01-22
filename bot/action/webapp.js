const { bot } = require("../core/bot");
const dataToMediaGroup = require("../helpers/dataToMediaGroup");

bot.on("message", async (ctx) => {
  if (ctx.webAppData) {
    const webapp = ctx.webAppData.data.json();
    const products = webapp.products;
    const user = { username: webapp.username, phone: webapp.phone };
    const photoswithCaptionForUser = dataToMediaGroup(products, webapp.totalPrice);
    const photoswithCaptionForAdmin = dataToMediaGroup(products, webapp.totalPrice, user);

    await ctx.sendMediaGroup(photoswithCaptionForUser);
    ctx.replyWithHTML(`<b>Xurmatli ${webapp.username}!!!</b>\n\n Tez orada aloqa markazimiz siz bilan bog'lanadi.`);
    ctx.telegram.sendMediaGroup(process.env.ADMIN_ID, photoswithCaptionForAdmin);
  }
});
