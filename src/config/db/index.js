const mongoose = require("mongoose");
async function connect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/tkw_product", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connect complete");
  } catch (error) {
    console.log("Error connecting to");
  }
}
module.exports = { connect };
