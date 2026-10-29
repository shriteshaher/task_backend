'use strict';

const TASK_STATUSES = ['TODO', 'IN_PROGRESS', 'COMPLETED'];
const TASK_PRIORITIES = ['LOW', 'MEDIUM', 'HIGH', 'URGENT'];

async function insertMissing(queryInterface, table, column, values, transaction) {
  const [rows] = await queryInterface.sequelize.query(
    `SELECT "${column}" FROM "${table}"`,
    { transaction }
  );
  const existing = new Set(rows.map((row) => row[column]));
  const missing = values
    .filter((value) => !existing.has(value))
    .map((value) => ({ [column]: value }));

  if (missing.length) {
    await queryInterface.bulkInsert(table, missing, { transaction });
  }
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await insertMissing(queryInterface, 'task_status', 'type', TASK_STATUSES, transaction);
      await insertMissing(queryInterface, 'task_priority', 'prority', TASK_PRIORITIES, transaction);
    });
  },

  async down(queryInterface, Sequelize) {
    const { Op } = Sequelize;
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.bulkDelete('task_status', { type: { [Op.in]: TASK_STATUSES } }, { transaction });
      await queryInterface.bulkDelete('task_priority', { prority: { [Op.in]: TASK_PRIORITIES } }, { transaction });
    });
  },
};
