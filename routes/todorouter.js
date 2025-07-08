const express = require("express");
const router = express.Router();
const TodoContoller = require("../controllers/Todo");
const authMiddleWare = require('../middleware/auth');

router.post("/todo",authMiddleWare, TodoContoller.createTodo);
router.patch("/todo/:id",authMiddleWare, TodoContoller.updateTodo);
router.get("/todos", authMiddleWare,TodoContoller.readTodo);
router.get("/todo/:id",authMiddleWare, TodoContoller.singleTodo);
router.delete("/todo/:id",authMiddleWare,TodoContoller.deleteTodo);

module.exports = router;
