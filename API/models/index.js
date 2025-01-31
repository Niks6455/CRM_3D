import { Sequelize } from 'sequelize';
import 'dotenv/config.js';
import User from './user.js';
import Product from './product.js';
import Order from './order.js';
const { DB_USER, DB_PWD, DB_HOST, DB_PORT, DB_NAME } = process.env;

// Создание экземпляра Sequelize
export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PWD, {
	host: DB_HOST,
	port: DB_PORT,
	dialect: 'postgres',
	define: {
		timestamps: true,
		underscored: true,
	},
	logging: false,
});

// // Инициализация моделей
User.initialize(sequelize);
Product.initialize(sequelize);
Order.initialize(sequelize);
// Добавление связей 

User.hasMany(Order, { foreignKey: 'idUser' });
Order.belongsTo(User, { foreignKey: 'idUser' });

Order.hasOne(Product, { foreignKey: 'idProduct' });

// Экспорт модели и sequelize instance
export const db = {
	sequelize,
	Sequelize,
	User,
};

export default db;
