const express = require("express");
const dbConnect = require("./config/dbConnect");
const app = express();
const userRouter = require("./routes/userrouter");
const TodoRouter = require("./routes/todorouter");
const cors = require('cors');
dbConnect().then(() => {
  console.log("Database connected successfully");
});
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true 
}));

app.use(express.json());

const PORT = 3000;

app.use("/api/v1/auth", userRouter);
app.use("/api/v1/todo", TodoRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
