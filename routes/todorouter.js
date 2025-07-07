const express = require("express");
const router = express.Router();
const TodoContoller = require("../controllers/Todo");
const authMiddleWare = require('../middleware/auth');

router.post("/createtodo",authMiddleWare, TodoContoller.createTodo);
router.patch("/:id",authMiddleWare, TodoContoller.updateTodo);
router.get("/", authMiddleWare,TodoContoller.readTodo);
router.get("/:id",authMiddleWare, TodoContoller.singleTodo);
router.delete("/:id",authMiddleWare,TodoContoller.deleteTodo);

module.exports = router;
