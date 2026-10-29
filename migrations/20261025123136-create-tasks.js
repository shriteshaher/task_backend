'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable('tasks',{
      id:{
        type:Sequelize.UUID,
        primaryKey:true,
        allowNull:false,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
      },
      name:{
        type:Sequelize.STRING(100),
        allowNull:false,

      },
      duration_start:{
         type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      duration_end:{
          type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
       createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            statusId:{
              type:Sequelize.UUID,
              allowNull:false,
              references:{
                model:'task_status',
                key: 'id',
              },
               onUpdate: 'CASCADE',
               onDelete: 'CASCADE',
            },
            prorityId:{
              type:Sequelize.UUID,
              allowNull:false,
              references:{
                model:'task_priority',
                key:'id'
              },
              onUpdate:'CASCADE',
              onDelete:'CASCADE'
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
     await queryInterface.dropTable('tasks');
  }
};
