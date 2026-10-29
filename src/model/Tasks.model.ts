import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  Sequelize
} from 'sequelize';

export class Tasks extends Model<InferAttributes<Tasks>,InferCreationAttributes<Tasks>>{
 declare id:CreationOptional<string>;
 declare name:string;
 declare durationStart:CreationOptional<Date>;
 declare durationEnd:CreationOptional<Date>;
 declare prority_id:string;
 declare status_id:string
 declare createdAt: CreationOptional<Date>;
 declare updatedAt: CreationOptional<Date>;
}

export function initTasks(sequelize: Sequelize){
  Tasks.init({
    id:{
      type:DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name:{
     type:DataTypes.STRING(100),
     allowNull:false
    },
    durationStart:{
      type:DataTypes.DATE,
      field:'duration_start',
    },
    durationEnd:{
      type:DataTypes.DATE,
      field:'duration_end',
    },
    prority_id:{
      type:DataTypes.UUID,
      allowNull:false,
      field:'prorityId',
      references:{
        model:'task_priority',
        key:'id'
      }
    },
    status_id:{
      type:DataTypes.UUID,
      allowNull:false,
      field:'statusId',
      references:{
        model:'task_status',
        key:'id'
      }
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
  }, {
      sequelize,
      modelName: 'task',
      tableName: 'tasks',
      timestamps: true,
    })
}
