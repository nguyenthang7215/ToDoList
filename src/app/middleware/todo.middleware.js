import pool from "../../configs/postgres.js";
import ApiError from "../../utils/classes/api-eror.js";

export async function checkValidId(req, res, next) {
    const id = req.params.id;
    const result = await pool.query('select * from todos where id = $1', [id]);
    if (result.rows.length > 0) {
        // req.todo = result.rows[0];
        next();
        return;
    }
    next(ApiError.notFound('Không tìm thấy danh sách'));
}

export async function checkValidUserId(req, res, next) {
    const userId = req.params.userId;
    const result = await pool.query('select * from todos where user_id = $1', [userId]);
    if (result.rows.length > 0) {
        // req.todo = result.rows;
        next();
        return;
    }
    next(ApiError.notFound('Không tìm thấy danh sách'));
}