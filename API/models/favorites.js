import { DataTypes, Model } from 'sequelize';

export default class Favorite extends Model {
  static initialize(sequelize) {
    Favorite.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'users', 
            key: 'id'
          },
          onDelete: 'CASCADE',
        },
        productId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'products', 
            key: 'id'
          },
          onDelete: 'CASCADE',
        },
      },
      {
        sequelize,
        schema: 'public',
        modelName: 'Favorite',
        tableName: 'favorites',
        timestamps: true,
        paranoid: true,
      }
    );
  }
}
