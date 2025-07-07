const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/crudApplication"),
      (useNewUrlParser = true);
    useUnifiedTopology = true;
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
};
 module.exports = dbConnect;
