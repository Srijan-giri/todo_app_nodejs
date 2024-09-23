const express = require('express');
const router = express.Router();

const todoController = require('../controllers/todoController');

router.get('/', todoController.getTodosController);
router.post('/create', todoController.createTodoController);
router.post('/update/:id', todoController.updateTodoController);
router.post('/destroy/:id', todoController.deleteTodoController);

router.post('/markTodo/:id', todoController.markAsDoneController);

module.exports = router;