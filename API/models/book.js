import { DataTypes, Model } from 'sequelize';
export default class Book extends Model {
  static initialize(sequelize) {
    Book.init(
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
        countPage: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        author: {
          type: DataTypes.STRING,
          allowNull: false,
        },  
        bookShelfId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'BookShelf',
            key: 'id',
          },
        },
      },
      {
        sequelize,
        schema: 'public',
        modelName: 'Book',
        tableName: 'books',
        timestamps: true,
        paranoid: true,
      }
    );
  }

}


