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
