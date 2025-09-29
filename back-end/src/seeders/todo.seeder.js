import { createTodo } from '../app/services/todo.service.js';

async function todoSeeder(users) {
    try {
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
    } catch (error) {
        throw new Error('Lỗi khi tạo todo seeder');
    }
}

export default todoSeeder;