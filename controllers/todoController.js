
const { createTodo, getTodos, getTodoById, updateTodo, deleteTodo, markAsDone, markAsDoneTodos } = require('../services/todoService')

module.exports.createTodoController = async (req, res) => {
    try {
        console.log(req.body);
        if (!req.body.todoText || req.body.todoText.trim() === '') {
            throw new Error('todo_message is required');
        }

        const todoData = {
            todoText: req.body.todoText,
            user_id: req.session.user.id
        }
        console.log(todoData);
        console.log(todoData.todoText);
        const todo = await createTodo(todoData);
        // res.status(201).send(todo);
        res.redirect('/todos/todoHome');
    } catch (err) {
        res.status(400).send(err.message);
    }
}

module.exports.getTodosController = async (req, res) => {
    try {
        const userId = req.session.user.id;
        const todos = await getTodos(userId);
        const markTodos = await markAsDoneTodos(userId);
        const todoName = "TodoApp";
        const firstUserName = req.session.user.first_name;
        res.render('index', { todos, markTodos, todoName, firstUserName });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching todos' });
    }
};


module.exports.getTodoByIdController = async (req, res) => {
    try {
        const todo = await getTodoById(req.params.id);
        if (!todo || todo.user_id != req.session.user.id) {
            res.status(404).send('Todo not found');
        }
        res.status(200).send(todo);
    } catch (err) {
        res.status(400).send(err.message);
    }
}

module.exports.updateTodoController = async (req, res) => {
    try {
        const todo = await getTodoById(req.params.id);
        if (!todo || todo.user_id !== req.session.user.id) {
            return res.status(404).send('Unauthorized access');
        }

        const updatedTodo = await updateTodo(req.params.id, req.body);
        // res.status(200).send(todo);
        res.redirect('/todos/todoHome');
    } catch (err) {
        res.status(400).send(err.message);
    }
}

module.exports.deleteTodoController = async (req, res) => {
    try {
        console.log("Marking todo ID:", req.params.id);
        const todoId = req.params.id;
        const tododelete = await deleteTodo(todoId);
        console.log("Deleed Todo: " + tododelete);
        res.redirect('/todos/todoHome');
    } catch (err) {
        res.status(400).send(err.message);
    }
}

module.exports.markAsDoneController = async (req, res) => {
    try {

        console.log("Marking todo ID:", req.params.id);
        const todoId = req.params.id;
        const markTodo = await markAsDone(todoId);
        console.log("Mark Todo: " + markTodo);
        res.redirect('/todos/todoHome');
    }
    catch (err) {
        res.status(400).send(err.message);
    }
}

module.exports.showTodo = async (req, res) => {
    res.render('index');
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