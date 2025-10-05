import pool from '../../configs/postgres.js';
import bcrypt from 'bcrypt';

export async function createUser({ username, email, password }) {
    const salt = await bcrypt.genSalt(10); // ma hoa hash code
    const hashedPassword = await bcrypt.hash(password, salt);

    const queryText = `
        insert into users (username, email, password)
        values ($1, $2, $3)
        returning id, username, email
    `;
    const result = await pool.query(queryText, [username, email, hashedPassword]);
    return result.rows[0];
};

export async function findUserById(id) {
    const queryText = `
        select id, username, email 
        from users 
        where id = $1
    `;
    const result = await pool.query(queryText, [id]);
    return result.rows[0];
}

// Tra ve cung voi password (Cho nhung lan xac thuc)
export async function findUserByEmail(email) {
    const queryText = `
        select id, username, email, password 
        from users 
        where username = $1
    `;
    const result = await pool.query(queryText, [email]);
    return result.rows[0];
}

export async function getAllUser() {
    const queryText = `
        select id, username, email from users
    `;
    const result = await pool.query(queryText);
    return result.rows;
}

export async function updateUser(id, { username, email }) {
    const queryText = `
        update users
        set username = $1, email = $2
        where id = $3
        returning id, username, email
    `;
    const result = await pool.query(queryText, [username, email, id]);
    return result.rows[0];
}

export async function resetPassword(id, password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const queryText = `
        update users 
        set password = $1 
        where id = $2
        returning *
    `;
    const result = await pool.query(queryText, [hashedPassword, id]);
    return result.rows.length > 0;
}

export async function deleteUser(id) {
    const queryText = `
        delete from users 
        where id = $1 
        returning *
    `;
    const result = await pool.query(queryText, [id]);
    return result.rows.length > 0;
}
