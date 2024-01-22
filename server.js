require("dotenv").config();
const express = require("express");
const mongoDB = require("./start/db");
const { bot } = require("./bot/core/bot");
const app = express();

app.use(bot.webhookCallback("/webhook"));

const run = async () => {
  await mongoDB();

  require("./start/routes")(app);

  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log("listening on port " + port));
};
module.exports = run;

// process.on("unhandledRejection", (err) => {
//   console.log("UNHANDLED REJECTION 💥");
//   console.log(err.name, err.message);
//   process.exit(1);
// });
// process.on("uncaughtException", (err) => {
//   console.log("UNHANDLED Excpections 💥");
//   console.log(err.name, err.message);
//   process.exit(1);
// });
// const admin = new AdminBro(adminOptions);
// const router = buildAdminRouter(admin);
// app.use(admin.options.rootPath, router);
