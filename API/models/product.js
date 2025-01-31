import { DataTypes, Model } from 'sequelize';

export default class Product extends Model {
  static initialize(sequelize) {
    Product.init(
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
        price: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        image: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
      },
      {
        sequelize,
        schema: 'public',
        modelName: 'Product',
        tableName: 'products',
        timestamps: true,
        paranoid: true,
      }
    );
  }
}
