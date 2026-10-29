import { sequelize } from '../config/database';
import { initTaskStatus } from './TaskStatus.model';
import { initTaskPriority } from './TaskPriority.model';
import { initTasks } from './Tasks.model';

export const initModels = () => {
  initTaskStatus(sequelize);
  initTaskPriority(sequelize);
  initTasks(sequelize);
  return sequelize;
};
