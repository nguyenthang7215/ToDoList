import * as userService from '../services/user.service';

export async function createUser(req, res) {
    const newUser = await userService.createUser(req.body);
    res.status(201).json(newUser);
}

export async function readUserById(req, res) {
    const user = await userService.findUserById(req.params.id);
    res.json(user);
}

export async function readUserByEmail(req, res) {
    const user = await userService.findUserByEmail(req.params.email);
    res.json(user);
}

export async function readAllUser(req, res) {
    const allUser = await userService.getAllUser();
    res.json(allUser);
}

export async function updateUser(req, res) {
    const user = await userService.updateUser(req.params.id, req.body);
    res.status(201).json(user);
}

export async function resetPassword(req, res) {
    const { id, password } = req.body;
    await userService.resetPassword(id, password);
    res.status(201).json({ message: 'Đã thay đổi mật khẩu thành công!' });
}

export async function deleteUser(req, res) {
    await userService.deleteUser(req.params.id);
    res.json({ message: 'Đã xoá thành công!' });
}

