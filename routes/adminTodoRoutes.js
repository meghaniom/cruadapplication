const express = require('express');
const router = express.Router();

const adminTodoContollers = require('../controllers/adminTodocontroller');
const authMiddleware = require('../middleware/auth');
const isAdmin = require('../middleware/admin');
const authMiddleWare = require('../middleware/auth');



router.get('/admin/todos', authMiddleware, isAdmin, adminTodoContollers.getallTodos);

 router.get('/admin/todo/:id', authMiddleWare, isAdmin, adminTodoContollers.getSignleTodos);

router.post ('/admin/createtodo', authMiddleware, isAdmin, adminTodoContollers.createTodoForuser);

router.patch('/admin/updateTodo/:id', authMiddleWare, isAdmin, adminTodoContollers.updateTodoById);

router.delete('/admin/todo/:id', authMiddleWare, isAdmin, adminTodoContollers.DeleteTodoById);  

 module.exports = router;