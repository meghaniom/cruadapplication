const express = require("express");
const router = express.Router();
const TodoContoller = require("../controllers/Todo");
const authMiddleWare = require("../middleware/auth");


router.post("/createtodo", authMiddleWare, TodoContoller.createTodo);
router.patch("/updatetodo/:id", authMiddleWare, TodoContoller.updateTodo);
router.get("/todos", authMiddleWare, TodoContoller.readTodo);
router.get("/todo/:id", authMiddleWare, TodoContoller.singleTodo);
router.delete("/deletetodo/:id", authMiddleWare, TodoContoller.deleteTodo);

module.exports = router;
