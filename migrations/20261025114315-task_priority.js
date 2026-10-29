'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('task_priority',{
      id:{
        type:Sequelize.UUID,
         primaryKey:true,
        allowNull:false,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
      },
      prority:{
        type:Sequelize.ENUM('LOW', 'MEDIUM', 'HIGH', 'URGENT'),
        allowNull:false,
        defaultValue: 'MEDIUM',
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
  }
};
