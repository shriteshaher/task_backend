import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  Sequelize
} from 'sequelize';


class TaskStatus extends Model<InferAttributes<TaskStatus>,InferCreationAttributes<TaskStatus>>{
 declare  id:CreationOptional<string>;
 declare status :CreationOptional<'TODO' | 'IN_PROGRESS' | 'COMPLETED'>
}

export function initTaskStatus(sequelize:Sequelize){
  TaskStatus.init(
    {
      id:{
      type:DataTypes.UUID,
      primaryKey:true,
      defaultValue:DataTypes.UUIDV4
      },
      status:{
        type:DataTypes.ENUM( 'TODO',
          'IN_PROGRESS',
          'COMPLETED'),
        field:'type',
        defaultValue: 'TODO',
      },
    }, {
      sequelize,
      modelName: 'TaskStatus',
      tableName: 'task_status',
      timestamps: false,
    }
  )

  return TaskStatus
}
