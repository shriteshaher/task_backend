'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable('task_status',{
      id:{
        type:Sequelize.UUID,
         primaryKey:true,
        allowNull:false,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
      },
      type: {type:Sequelize.ENUM(
          'TODO',
          'IN_PROGRESS',
          'COMPLETED'
        ),
        defaultValue: 'TODO',
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
