const express = require("express");
const dbConnect = require("./config/dbConnect");
const app = express();
const userRouter = require("./routes/userrouter");
const TodoRouter = require("./routes/todorouter");

dbConnect().then(() => {
  console.log("Database connected successfully");
});
app.use(express.json());

const PORT = 3000;

app.use("/api/v1/auth", userRouter);
app.use("/api/v1/todo", TodoRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
