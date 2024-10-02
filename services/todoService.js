const { TodoApp } = require('../models');

const createTodo = async (todoData) => {
    try {
        console.log(todoData);
        const todo = await TodoApp.create({
            todo_message: todoData.todoText,
            user_id: todoData.user_id
        });
        console.log(todo);
        return todo;
    } catch (err) {
        throw new Error(err);
    }
}

const getTodos = async (userId) => {
    console.log(`Fetching todos for user ${userId}`);
    const todos = await TodoApp.findAll({ where: { is_marked: false, user_id: userId } });
    return todos;
}

const getTodoById = async (id) => {
    try {
        const todo = await TodoApp.findByPk(id);
        return todo;
    } catch (err) {
        throw new Error(err);
    }
}

const updateTodo = async (id, todo) => {
    try {
        const oldTodo = await getTodoById(id);
        if (!oldTodo) {
            throw new Error('Todo not found');
        }
        const updatedTodo = await oldTodo.update(todo);
        return updatedTodo;
    } catch (err) {
        throw new Error(err);
    }
}

const deleteTodo = async (id) => {
    try {
        const todo = await getTodoById(id);
        if (!todo) {
            throw new Error('Todo not found');
        }
        await todo.destroy();
        return todo;
    } catch (err) {
        throw new Error(err);
    }
}

const markAsDone = async (todoId) => {
    try {
        const todo = await getTodoById(todoId);
        if (!todo) {
            throw new Error('Todo not found');
        }

        console.log("Mark as done : " + todo);
        todo.is_marked = true;
        await todo.save({ fields: ['is_marked'] });
        return todo;
    }
    catch (err) {
        throw new Error(err);
    }
}

const markAsDoneTodos = async (userId) => {
    try {
        console.log(`Fetching mark todos for user ${userId}`);
        const todos = await TodoApp.findAll({ where: { is_marked: true, user_id: userId } });
        return todos;
    }
    catch (err) {
        throw new Error(err);
    }
}

module.exports = {
    createTodo,
    getTodos,
    getTodoById,
    updateTodo,
    deleteTodo,
    markAsDone,
    markAsDoneTodos
}