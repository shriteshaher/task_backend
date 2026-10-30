import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  Sequelize
} from 'sequelize';

export class TaskPriority  extends Model<InferAttributes<TaskPriority>,InferCreationAttributes<TaskPriority>>{
  declare  id:CreationOptional<string>;
  declare  prority : CreationOptional<'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'>;
}

export  function initTaskPriority(sequelize:Sequelize){
 TaskPriority.init(
    {
        id:{
          type:DataTypes.UUID,
          primaryKey:true,
          defaultValue:DataTypes.UUIDV4
        },
        prority:{
            type:DataTypes.ENUM('LOW', 'MEDIUM', 'HIGH', 'URGENT'),
            allowNull:false,
            defaultValue:'MEDIUM'
        },
    },
    {
      sequelize,
      modelName: 'TaskPriority',
      tableName: 'task_priority',
      timestamps: false,
    }

 )
 return TaskPriority
}
