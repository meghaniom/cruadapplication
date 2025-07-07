const express = require("express");
const router = express.Router();
const TodoContoller = require("../controllers/Todo");

router.post("/createtodo", TodoContoller.createTodo);
router.patch("/:id", TodoContoller.updateTodo);
router.get("/",TodoContoller.readTodo);
router.get("/:id", TodoContoller.singleTodo);
router.delete("/:id",TodoContoller.deleteTodo);

module.exports = router;
