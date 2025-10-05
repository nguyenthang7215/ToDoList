import pool from '../../configs/postgres.js';

export async function createTodo({ title, description, status, due_date, user_id }) {
    const queryText = `
        insert into todos (title, description, status, due_date, user_id)
        values ($1, $2, $3, $4, $5)
        returning *
    `;
    const result = await pool.query(queryText, [title, description, status, due_date, user_id]);
    return result.rows[0];
}

export async function findTodoById(id) {
    const queryText = `
        select * from todos 
        where id = $1
    `;
    const result = await pool.query(queryText, [id]);
    return result.rows[0];
}

export async function findTodoByUserId(userId) {
    const queryText = `
        select * from todos 
        where user_id = $1
    `;
    const result = await pool.query(queryText, [userId]);
    return result.rows;
}

// With user information
export async function getAllTodo() {
    const queryText = `
        select t.*, u.username, u.email
        from todos t
        join users u on u.id = t.user_id
    `;
    const result = await pool.query(queryText);
    return result.rows;
}

export async function updateTodo(id, { title, description, status, due_date }) {
    const queryText = `
        update todos
        set title = $1, description = $2, status = $3, due_date = $4
        where id = $5
        returning *
    `;
    const result = await pool.query(queryText, [title, description, status, due_date, id]);
    return result.rows[0];
}

export async function toggleStatus(id) {
    const currentTodo = await findTodoById(id);
    const newStatus = currentTodo.status === 'pending' ? 'done' : 'pending';

    const queryText = `
        update todos
        set status = $1
        where id = $2
        returning *
    `;
    const result = await pool.query(queryText, [newStatus, id]);
    return result.rows[0];
}

export async function deleteTodo(id) {
    const queryText = `
        delete from todos 
        where id = $1 
        returning * 
    `;
    const result = await pool.query(queryText, [id]);
    return result.rows.length > 0;
}