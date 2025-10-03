import pool from '../../configs/postgres.js';

// Create new todo 
export async function createTodo({ title, description, status, due_date, user_id }) {
    try {
        const queryText = `
            insert into todos (title, description, status, due_date, user_id)
            values ($1, $2, $3, $4, $5)
            returning *
        `;
        const result = await pool.query(queryText, [title, description, status, due_date, user_id]);
        return result.rows[0];
    } catch (error) {
        throw new Error('Lỗi tạo todo list: ' + error.message);
    }
}

// Find todo by id
export async function findTodoById(id) {
    try {
        const queryText = `
            select * from todos 
            where id = $1
        `;
        const result = await pool.query(queryText, [id]);
        if (result.rows.length === 0) {
            return null;
        }
        return result.rows[0];
    } catch (error) {
        throw new Error('Lỗi không tìm thấy được todo:' + error.message);
    }
}

// Find todo by user_id
export async function findTodoByUserId(userId) {
    try {
        const queryText = `
            select * from todos 
            where user_id = $1
        `;
        const result = await pool.query(queryText, [userId]);
        return result.rows;
    } catch (error) {
        throw new Error('Lỗi không tìm thấy được todo: ' + error.message);
    }
}

// Get all todo (with user information)
export async function getAllTodo() {
    try {
        const queryText = `
            select t.*, u.username, u.email
            from todos t
            join users u on u.id = t.user_id
        `;
        const result = await pool.query(queryText);
        return result.rows;
    } catch (error) {
        throw new Error('Lỗi không lấy được tất cả todo list: ' + error.message);
    }
}

// Update todo (title, description, status, due_date)
export async function updateTodo(id, { title, description, status, due_date }) {
    try {
        const currentTodo = await findTodoById(id);
        if (!currentTodo) {
            throw new Error('Id không hợp lệ');
        }
        const queryText = `
            update todos
            set title = $1, description = $2, status = $3, due_date = $4
            where id = $5
            returning *
        `;
        const result = await pool.query(queryText, [title, description, status, due_date, id]);
        return result.rows[0];
    } catch (error) {
        throw new Error('Lỗi không cập nhật được todo list:' + error.message);
    }
}

// Toggle status (pending and done)
export async function toggleStatus(id) {
    try {
        const currentTodo = await findTodoById(id);
        if (!currentTodo) {
            throw new Error('Id không hợp lệ');
        }
        const newStatus = currentTodo.status === 'pending' ? 'done' : 'pending';

        const queryText = `
            update todos
            set status = $1
            where id = $2
            returning *
        `;
        const result = await pool.query(queryText, [newStatus, id]);
        return result.rows[0];
    } catch (error) {
        throw new Error('Lỗi thay đôi trạng thái:' + error.message);
    }
}

// Delete todo 
export async function deleteTodo(id) {
    try {
        const queryText = `
            delete from todos where id = $1 returning * 
        `;
        const result = await pool.query(queryText, [id]);
        return result.rows.length > 0;
    } catch (error) {
        throw new Error('Lỗi không xoá được todo list:' + error.message);
    }
}
