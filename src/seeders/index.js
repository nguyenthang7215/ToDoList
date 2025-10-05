import pool from '../configs/postgres.js';
import todoSeeder from './todo.seeder.js';
import userSeeder from './user.seeder.js';
import { getAllTodo } from '../app/services/todo.service.js';
import { getAllUser } from '../app/services/user.service.js';

async function seed() {
    try {
        console.log('Seeding database ...');
        
        const client = await pool.connect();
        // Xoa du lieu co san
        try{
            await client.query('delete from users');
            await client.query('delete from todos');
            await client.query('alter sequence users_id_seq restart with 1');
            await client.query('alter sequence todos_id_seq restart with 1');
        }
        finally{
            client.release();
        }

        const users = await userSeeder();
        const todos = await todoSeeder(users);

        const allUsers = await getAllUser();
        const allTodos = await getAllTodo();
        
        console.log(allUsers);
        console.log('----------------------------------------------');
        console.log(allTodos);
    } catch (error) {
        throw new Error('Lỗi seeding database');
    }
}

seed();