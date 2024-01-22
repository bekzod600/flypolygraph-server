const { connect } = require("mongoose");

module.exports = async () => {
  try {
    connect(process.env.DB);
    console.log("DB connected");
  } catch (error) {
    console.log(`DB ERROR: ${error.message}`);
  }
};
