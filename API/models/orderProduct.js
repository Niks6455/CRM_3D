import { DataTypes, Model } from 'sequelize';

export default class OrderProduct extends Model {
  static initialize(sequelize) {
    OrderProduct.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        orderId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'orders',
            key: 'id',
          },
          onDelete: 'CASCADE',
        },
        productId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'products',
            key: 'id',
          },
          onDelete: 'CASCADE',
        },
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        schema: 'public',
        modelName: 'OrderProduct',
        tableName: 'order_products',
        timestamps: true,
        paranoid: true,
      }
    );
  }
}
