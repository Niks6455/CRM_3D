import { DataTypes, Model } from 'sequelize';
export default class User extends Model {
  static initialize(sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        fio: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: { 
          type: DataTypes.STRING,
           allowNull: true
        },
        role: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 1
        }
      },
      {
        sequelize,
        schema: 'public',
        modelName: 'User',
        tableName: 'users',
        timestamps: true,
        paranoid: true,
      }
    );
  }

}


