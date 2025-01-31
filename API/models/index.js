import { Sequelize } from 'sequelize';
import 'dotenv/config.js';
import User from './user.js';
import Book from './book.js';
import BookCase from './bookCase.js';
import BookShelf from './bookShelf.js';

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
BookCase.initialize(sequelize);
BookShelf.initialize(sequelize);
Book.initialize(sequelize);

// // Связывание моделей

User.hasMany(BookCase);
BookCase.belongsTo(User, { foreignKey: 'userId' });

BookCase.hasMany(BookShelf);
BookShelf.belongsTo(BookCase, { foreignKey: 'bookCaseId' });

BookShelf.hasMany(Book);
Book.belongsTo(BookShelf, { foreignKey: 'bookShelfId' });

// Экспорт модели и sequelize instance
export const db = {
	sequelize,
	Sequelize,
	User,
	BookCase,
	BookShelf,
	Book,
};

export default db;
