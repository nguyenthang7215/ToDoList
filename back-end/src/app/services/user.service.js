import pool from '../../configs/postgres.js';
import bcrypt from 'bcrypt';

// Create new user
export async function createUser({ username, email, password }) {
    // const client = await pool.connect();
    try {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds); // ma hoa hash code
        const hashedPassword = await bcrypt.hash(password, salt);

        const queryText = `
            insert into users (username, email, password)
            values ($1, $2, $3)
            returning id, username, email
        `;

        const result = await pool.query(queryText, [username, email, hashedPassword]);
        return result.rows[0];
    } catch (error) {
        throw new Error(`Lỗi tạo người dùng: ${error.message}`);
    }
    // finally {
    //     client.release();
    // }
};

// Find user by id 
export async function findUserById(id) {
    try {
        const queryText = 'select id, username, email from users where id = $1';
        const result = await pool.query(queryText, [id]);
        if (result.rows.length === 0) {
            return null;
        }
        return result.rows[0];
    } catch (error) {
        throw new Error(`Lỗi không tim thấy người dùng: ${error.message}`);
    }
}

// Find user by email 
export async function findUserByEmail(email) {
    try {
        const queryText = 'select id, username, email from users where email = $1';
        const result = await pool.query(queryText, [email]);
        if (result.rows.length === 0) {
            return null;
        }
        return result.rows[0];
    } catch (error) {
        throw new Error(`Lỗi không tim thấy người dùng: ${error.message}`);
    }
}

// Find user by username
export async function findUserByUsername(username) {
    try {
        const queryText = 'select id, username, email from users where username = $1';
        const result = await pool.query(queryText, [username]);
        if (result.rows.length === 0) {
            return null;
        }
        return result.rows[0];
    } catch (error) {
        throw new Error(`Lỗi không tim thấy người dùng: ${error.message}`);
    }
}

// Get all user
export async function getAllUser() {
    try {
        const queryText = 'select id, username, email from users';
        const result = await pool.query(queryText);
        return result.rows;
    } catch (error) {
        throw new Error(`Lỗi lấy dữ liệu tất cả người dùng: ${error.message}`);
    }
}

// Update user information (username, email)
export async function updateUser(userId, { username, email }) {
    try {
        const currentUser = await findUserById(userId);
        if (!currentUser) {
            throw new Error('Id không hợp lệ');
        }
        const queryText = `
            update users
            set username = $1, email = $2
            where id = $3
            returning id, username, email
        `;
        const result = await pool.query(queryText, [username, email, userId]);
        return result.rows[0];
    } catch (error) {
        throw new Error('Lỗi cập nhật thông tin người dùng: ' + error.message);
    }
}

// Delete user
export async function deleteUser(userId) {
    try {
        const queryText = 'delete from users where id = $1 returning *';
        const result = await pool.query(queryText, [userId]);
        return result.rows.length > 0;
    } catch (error) {
        throw new Error('Lỗi xoá người dùng: ' + error.message);
    }
}

// Rest password
export async function resetPassword(userId, password) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const queryText = `
            update users 
            set password = $1 
            where id = $2
            returning *
        `;
        const result = await pool.query(queryText, [hashedPassword, userId]);
        return result.rows.length > 0;
    } catch (error) {
        throw new Error('Lỗi không thay đổi được mật khẩu: ' + error.message);
    }
}
