import { sequelize } from '../config/database';
import { initTaskStatus } from './TaskStatus.model';
import { initTaskPriority } from './TaskPriority.model';
import { initTasks, Tasks } from './Tasks.model';

export const initModels = () => {
  const TaskStatus = initTaskStatus(sequelize);
  const TaskPriority = initTaskPriority(sequelize);
  initTasks(sequelize);

  Tasks.belongsTo(TaskStatus, { foreignKey: 'status_id', as: 'status' });
  Tasks.belongsTo(TaskPriority, { foreignKey: 'prority_id', as: 'priority' });

  return sequelize;
};
