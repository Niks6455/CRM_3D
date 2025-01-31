import { DataTypes, Model } from 'sequelize';

export default class Review extends Model {
  static initialize(sequelize) {
    Review.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        review: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        schema: 'public',
        modelName: 'Review',
        tableName: 'reviews',
        timestamps: true,
        paranoid: true,
      }
    );
  }
}
