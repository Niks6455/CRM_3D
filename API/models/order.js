import { DataTypes, Model } from 'sequelize';

export default class Order extends Model {
  static initialize(sequelize) {
    Order.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        phoneNumber: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        status: {
          type: DataTypes.ENUM('pending', 'processing', 'completed', 'canceled'),
          allowNull: false,
          defaultValue: 'pending', // Новый заказ всегда в статусе "pending"
        },
      },
      {
        sequelize,
        schema: 'public',
        modelName: 'Order',
        tableName: 'orders',
        timestamps: true,
        paranoid: true,
      }
    );
  }
}
