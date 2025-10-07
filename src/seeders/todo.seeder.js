import { createTodo } from '../app/services/todo.service.js';

async function todoSeeder(users) {
    const todos = [];
    const todo1 = await createTodo({
        title: 'Learn English',
        description: 'Learn 10 units perday',
        status: 'pending',
        due_date: '2025-09-30',
        user_id: users[1].id
    })

    const todo2 = await createTodo({
        title: 'Play Football',
        description: 'Play at 8 AM',
        status: 'done',
        due_date: '2025-09-29',
        user_id: users[0].id
    })

    todos.push(todo1);
    todos.push(todo2);

    return todos;
}

export default todoSeeder;
