const express = require("express");
const dbConnect = require("./config/dbConnect");


dbConnect()
.then(() => {
    console.log("Database connected successfully");
})
const app = express();
const PORT = 3000;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
