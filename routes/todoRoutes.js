const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/authMiddleware');


const todoController = require('../controllers/todoController');

// router.get('/todoHome', isAuthenticated, todoController.showTodo);
router.get('/todoHome', isAuthenticated, todoController.getTodosController);
router.post('/create', isAuthenticated, todoController.createTodoController);
// router.post('/todos/update/:id', isAuthenticated, todoController.updateTodoController);
router.post('/markTodo/:id', isAuthenticated, todoController.markAsDoneController);
router.post('/destroy/:id', isAuthenticated, todoController.deleteTodoController);

module.exports = router;