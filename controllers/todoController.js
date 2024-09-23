
const { createTodo, getTodos, getTodoById, updateTodo, deleteTodo, markAsDone, markAsDoneTodos } = require('../services/todoService')

module.exports.createTodoController = async (req, res) => {
    try {
        console.log(req.body);
        if (!req.body.todoText || req.body.todoText.trim() === '') {
            throw new Error('todo_message is required');
        }
        const todo = await createTodo(req.body);
        // res.status(201).send(todo);
        res.redirect('/');
    } catch (err) {
        res.status(400).send(err.message);
    }
}

module.exports.getTodosController = async (req, res) => {
    try {
        const todos = await getTodos();
        const markTodos = await markAsDoneTodos();
        // console.log('Fetched Todos:', todos);
        res.render('index', { todos, markTodos });
    } catch (err) {
        res.status(400).send(err.message);
    }
}


module.exports.getTodoByIdController = async (req, res) => {
    try {
        const todo = await getTodoById(req.params.id);
        if (!todo) {
            res.status(404).send('Todo not found');
        }
        res.status(200).send(todo);
    } catch (err) {
        res.status(400).send(err.message);
    }
}

module.exports.updateTodoController = async (req, res) => {
    try {
        const todo = await updateTodo(req.params.id, req.body);
        // res.status(200).send(todo);
        res.redirect('/');
    } catch (err) {
        res.status(400).send(err.message);
    }
}

module.exports.deleteTodoController = async (req, res) => {
    try {
        const todo = await deleteTodo(req.params.id);
        // res.status(200).send(todo);
        res.redirect('/');
    } catch (err) {
        res.status(400).send(err.message);
    }
}

module.exports.markAsDoneController = async (req, res) => {
    try {
        const todo = await markAsDone(req.params.id);
        res.redirect('/');
    }
    catch (err) {
        res.status(400).send(err.message);
    }
}

// module.exports.markAsDoneTodosController = async (req, res) => {
//     try {
//         const markTodos = await markAsDoneTodos();
//         res.render('index', { markTodos });
//     }
//     catch (err) {
//         res.status(400).send(err.message);
//     }
// }

// module.exports = {
//     createTodoController,
//     getTodosController,
//     getTodoByIdController,
//     updateTodoController,
//     deleteTodoController
// }