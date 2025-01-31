import { DataTypes, Model } from "sequelize";

export default class BookCase extends Model {
  static initialize(sequelize) {
    BookCase.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        countShelf: {
          type: DataTypes.STRING, 
          allowNull: true,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'User',
            key: 'id',
          },
        },
      },
      {
        sequelize,
        schema: 'public',
        modelName: 'BookCase',
        tableName: 'bookCases',
        timestamps: true,
        paranoid: true,
      }
    );
  }
}
