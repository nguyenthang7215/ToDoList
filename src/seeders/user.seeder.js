import { createUser } from '../app/services/user.service.js';

async function userSeeder() {
    const users = [];
    const user1 = await createUser({
        username: 'thang123',
        email: 'thangnguyen@gmail.com',
        password: '123'
    });

    const user2 = await createUser({
        username: 'tam99',
        email: 'tam99@gmail.com',
        password: '456'
    });

    users.push(user1);
    users.push(user2);

    return users;
}

export default userSeeder;