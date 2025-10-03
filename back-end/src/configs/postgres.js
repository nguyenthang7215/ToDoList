import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        // port: process.env.DB_PORT, // Khong can, mac dinh la cong 5432
        dialect: 'postgres', // Bat buoc phai chi dinh la postgres
    }
);

async function connectDB() {
    try {
        await sequelize.authenticate(); // Thu ket noi toi db
        console.log('Kết nối thành công tới database!');
    } catch (error) {
        console.error('Lỗi kết nối:', error);
    }
};

connectDB;

export default sequelize;