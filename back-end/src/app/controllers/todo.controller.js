import * as todoService from '../services/todo.service';

export async function createTodo(req, res) {
    try {
        const { title, description, status, due_date, user_id } = req.body;
        const newTodo = await todoService.createTodo({ title, description, status, due_date, user_id });
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getTodoById(req, res) {
    try {
        const { id } = req.params;
        const todo = await todoService.findTodoById(id);
        if (todo.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy!' });
        }
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getTodoByUserId(req, res) {
    try {
        const { user_id } = req.params;
        const todo = await todoService.findTodoByUserId(user_id);
        if (!todo) {
            return res.status(404).json({ message: 'Không tìm thấy!' });
        }
        res.json(todo); // mac dinh la 200
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getAllTodo(req, res) {
    try {
        const allTodo = await todoService.getAllTodo();
        res.json(allTodo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function updateTodo(req, res) {
    try {
        const { id } = req.params;
        const { title, description, status, due_date } = req.body;
        const todo = await todoService.updateTodo(id, { title, description, status, due_date });
        res.json(todo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function toggleStatus(req, res) {
    try {
        const { id } = req.params;
        const todo = await todoService.toggleStatus(id);
        res.json(todo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function deleteTodo(req, res) {
    try {
        const { id } = req.params;
        const ok = await todoService.deleteTodo(id);
        if (!ok) {
            return res.status(404).json({ message: 'Xoá không thành công!' });
        }
        res.json({ message: 'Xoá thành công!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}