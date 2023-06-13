import { Model, QueryInterface, DataTypes } from 'sequelize';
import { Team } from '../../Interfaces/teams';
export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<Team>>('books', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      teamName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('teams');
  },
};