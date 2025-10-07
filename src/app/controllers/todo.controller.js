import * as todoService from '../services/todo.service';

export async function createTodo(req, res) {
    const newTodo = await todoService.createTodo(req.body);
    res.status(201).json(newTodo);
}

export async function readTodoById(req, res) {
    const todo = await todoService.findTodoById(req.params.id);
    res.json(todo); // mac dinh la 200
}

export async function readTodoByUserId(req, res) {
    const todo = await todoService.findTodoByUserId(req.params.userId);
    res.json(todo); 
}

export async function readAllTodo(req, res) {
    const allTodo = await todoService.getAllTodo();
    res.json(allTodo);
}

export async function updateTodo(req, res) {
    const todo = await todoService.updateTodo(req.params.id, req.body);
    res.status(201).json(todo);
}

export async function toggleStatus(req, res) {
    const todo = await todoService.toggleStatus(req.params.id);
    res.satus(201).json(todo);
}

export async function deleteTodo(req, res) {
    await todoService.deleteTodo(req.params.id);
    res.json({ message: 'Xoá thành công!' });
}
