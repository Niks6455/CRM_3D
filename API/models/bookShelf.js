import { DataTypes, Model } from 'sequelize';
export default class BookShelf extends Model {
  static initialize(sequelize) {
    BookShelf.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        numberShelf: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        sizePageCount: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        bookCaseId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'BookCase',
            key: 'id',
          },
        },
      },
      {
        sequelize,
        schema: 'public',
        modelName: 'BookShelf',
        tableName: 'bookShelfs',
        timestamps: true,
        paranoid: true,
      }
    );
  }

}


