import * as authService from '../services/auth.service.js';
import * as userService from '../services/user.service.js';

export async function login(req, res) {
    const validLogin = await authService.checkValidLogin(req.body); // email, password
    if (validLogin) {
        const result = authService.authToken(validLogin);
        res.json({ result, message: 'Đăng nhập thành công!' });
    }
    else {
        res.status(400).json({ message: 'Email hoặc mật khẩu không đúng!' });
    }
}

export async function register(req, res) {
    const newUser = await authService.register(req.body);
    const result = authService.authToken(newUser);
    res.status(201).json({ result, message: 'Đăng ký thành công!' });
}

export async function logout(req, res) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).json({ message: 'Thiếu token!' });
    }
    const token = authHeader.split(' ')[1];
    await authService.blockToken(token);
    res.json({ message: 'Đăng xuất thành công!' })
}

export async function resetPassword(req, res) {
    const { id, password } = req.body;
    await userService.resetPassword(id, password);

    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    await authService.blockToken(token);
    res.json({ message: 'Đổi mật khẩu thành công!' });
}



