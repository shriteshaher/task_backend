import { CreateTaskRequest } from "../../dto/CreateTaskRequest.dto";
import { UpdateTaskRequest } from "../../dto/UpdateTaskRequest.dto";
import { Tasks } from "../../model/Tasks.model";

export interface ITaskRepository{
     createTask ( createTaskRequest:CreateTaskRequest):Promise<Tasks>;
     findAll():Promise<Tasks[]>;
     findById(id:string):Promise<Tasks | null>;
     updateTask(id:string, updateTaskRequest:UpdateTaskRequest):Promise<Tasks | null>;
     deleteTask(id:string):Promise<boolean>;
}
