import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { findUserByEmail, createUser } from './user.service.js';
import dotenv from 'dotenv';

dotenv.config();

export async function registerUser({ username, email, password }) {
    const user = await findUserByEmail(email);
    if (user) { // ton tai 
        return false;
    }
    const newUser = await createUser({ username, email, password });
    return newUser;
}

export async function loginUser({ email, password }) {
    const user = await findUserByEmail(email);
    if (!user) { // khong ton tai 
        return false;
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
        return false;
    }

    const payload = { id: user.id, email: user.email };
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: process.env.LOGIN_EXPIRE_IN });
    const decode = jwt.decode(token);
    const expireIn = decode.exp - decode.iat;

    return {
        user: {
            id: user.id,
            username: user.username,
            email: user.email
        },
        access_token: token,
        expire_in: expireIn,
        auth_type: 'Bearer Token'
    }
}

// Can them lien quan den token (Chua lam)