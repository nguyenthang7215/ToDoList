// Build the Controller layer to handle request, response and call the service for result
// Notice: Implement the Error Class handler for handle the fail api request.
// Muc dich cua controller : Nhận request từ user 
// -> Thao tác với DB + Gọi service để xử lý 
// -> Trả lại response về thằng view
//////////////////// ---------> Mục đích controller : gọi service để handler request 
import * as userService from '../services/user.service';

export async function createUser(req, res) {
    try {
        const { username, email, password } = req.body;
        const newUser = await userService.createUser({ username, email, password });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getUserById(req, res) {
    try {
        const { id } = req.params;
        const user = await userService.findUserById(id);
        if (!user) {
            return res.status(404).json({ message: 'Không tìm thấy!' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getUserByEmail(req, res) {
    try {
        const { email } = req.params;
        const user = await userService.findUserByEmail(email);
        if (!user) {
            return res.status(404).json({ message: 'Không tìm thấy!' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getUserByUsername(req, res) {
    try {
        const { username } = req.params;
        const user = await userService.findUserByUsername(username);
        if (!user) {
            return res.status(404).json({ message: 'Không tìm thấy!' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getAllUser(req, res) {
    try {
        const allUser = await userService.getAllUser();
        res.json(allUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function updateUser(req, res) {
    try {
        const { id } = req.params;
        const { username, email } = req.body;
        const user = await userService.updateUser(id, { username, email });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function deleteUser(req, res) {
    try {
        const { id } = req.params;
        const ok = await userService.deleteUser(id);
        if (!ok) {
            return res.status(404).json({ message: 'Xoá không thành công!' });
        }
        res.json({ message: 'Đã xoá thành công!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function resetPassword(req, res) {
    try {
        const { id, password } = req.body;
        const ok = await userService.resetPassword(id, password);
        if (!ok) {
            return res.status(404).json({ message: 'Thay đổi mật khẩu không thành công!' });
        }
        res.json({ message: 'Đã thay đổi mật khẩu thành công!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}