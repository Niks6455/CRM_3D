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
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        count: {
          type: DataTypes.INTEGER,
          allowNull: false,
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


