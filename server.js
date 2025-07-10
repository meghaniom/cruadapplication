const express = require("express");
const dbConnect = require("./config/dbConnect");
const cors = require("cors");

const userRouter = require("./routes/userRouter");
const TodoRouter = require("./routes/todorouter");
const adminRouter =  require("./routes/adminTodoRoutes");

const app = express();

dbConnect().then(() => {
  console.log("Database connected successfully");
});

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);

app.use(express.json());

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ message: "Malformed JSON body" });
  }
  next();
});

app.use("/api/v1/auth", userRouter);
app.use("/api/v1/todo", TodoRouter);
app.use("/api/v1/admin", adminRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
