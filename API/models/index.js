import { Sequelize } from 'sequelize';
import 'dotenv/config.js';
import User from './user.js';
import Product from './product.js';
import Order from './order.js';
import OrderProduct from './orderProduct.js';
import Review from './reviews.js';
import Favorite from './favorites.js';
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
OrderProduct.initialize(sequelize);
Review.initialize(sequelize);
Favorite.initialize(sequelize);
// Добавление связей 

// User -> Orders (1:M)
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Review, { foreignKey: 'userId' });
Review.belongsTo(User, { foreignKey: 'userId' } )

// Один пользователь может иметь много избранных товаров
User.hasMany(Favorite, { foreignKey: 'userId' });
Favorite.belongsTo(User, { foreignKey: 'userId' });

// Один продукт может быть в избранном у многих пользователей
Product.hasMany(Favorite, { foreignKey: 'productId' });
Favorite.belongsTo(Product, { foreignKey: 'productId' });

// Order -> Product (M:M через OrderProduct)
Order.belongsToMany(Product, { through: OrderProduct, foreignKey: 'order_id' });
Product.belongsToMany(Order, { through: OrderProduct, foreignKey: 'product_id' });

// Order -> OrderProduct (1:M)
Order.hasMany(OrderProduct, { foreignKey: 'order_id' });
OrderProduct.belongsTo(Order, { foreignKey: 'order_id' });

// Product -> OrderProduct (1:M)
Product.hasMany(OrderProduct, { foreignKey: 'product_id' });
OrderProduct.belongsTo(Product, { foreignKey: 'product_id' });


// Экспорт модели и sequelize instance
export const db = {
	sequelize,
	Sequelize,
	User,
};

export default db;
