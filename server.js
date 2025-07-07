const express = require("express");
const dbConnect = require("./config/dbConnect");
const app = express();
const router = require('./routes/userrouter');


dbConnect()
.then(() => {
    console.log("Database connected successfully");
})
app.use(express.json());

const PORT = 3000;

app.use('/api/v1/auth',router)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
