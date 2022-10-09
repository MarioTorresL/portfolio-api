'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.createTable('Roles',{
      id:{
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name:{
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique:true
      },
      createdAt:{
        allowNull: false,
        type: Sequelize.DataTypes.DATE
      },
      updatedAt:{
        allowNull: false,
        type: Sequelize.DataTypes.DATE
      },
      deletedAt:{
        allowNull: true,
        type: Sequelize.DataTypes.DATE
      }
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.dropTable('Roles')
  }
};
