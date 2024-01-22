module.exports = function dataToMediaGroup(products, totalPrice, user) {
  const photoswithCaption = products.map((val, i) => {
    return { media: val.images[0].secure_url, type: "photo", parse_mode: "HTML" };
  });
  const aboutProducts = products.map((val) => {
    return `\n<b>nomi</b>:  <i>${val.title}</i> \n<b>soni</b>:  <i>${val.qty}</i> \n<b>narxi</b>:  <i>${val.price}</i> \n_______________________`;
  });
  if (!user) {
    const caption =
      "<b>Siz tanlagan mahsulotlar!!!</b> \n" +
      aboutProducts.join() +
      `\n\n<i>Umumiy summa: <b>${totalPrice}</b>so'm</i>`;
    photoswithCaption[0].caption = caption;
  } else {
    const caption =
      `<b>Sotib oluvchi: ${user.username} \n` +
      `<a href="tel:${user.phone}">Telefon nomeri: ${user.phone}</a> \n\n` +
      `Tanlangan mahsulotlar</b>\n` +
      aboutProducts.join() +
      `\n\n<i>Umumiy summa: <b>${totalPrice}</b>so'm</i>`;
    photoswithCaption[0].caption = caption;
  }
  return photoswithCaption;
};
