import pool from '../../configs/postgres.js';
import ApiError from '../../utils/classes/api-eror.js';
import validator from 'validator';

export async function checkValidId(req, res, next) {
    const id = req.params.id;

    if (!validator.isInt(id, { min: 1 })) {
        return next(ApiError.badRequest('Id không hợp lệ'));
    }

    const result = await pool.query('select * from users where id = $1', [id]);
    if (result.rows.length > 0) {
        // req.user = result.rows[0];
        next();
        return;
    }
    next(ApiError.notFound('Không tìm thấy người dùng'));
}

export async function checkValidEmail(req, res, next) {
    const email = req.params.email;

    if (!validator.isEmail(email)) {
        return next(ApiError.badRequest('Định dạng email không hợp lệ'));
    }

    const result = await pool.query('select * from users where email = $1', [email]);
    if (result.rows.length > 0) {
        next();
        return;
    }
    next(ApiError.notFound('Không tìm thấy người dùng'));
}    