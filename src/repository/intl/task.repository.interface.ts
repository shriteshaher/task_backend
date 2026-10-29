import { CreateTaskRequest } from "../../dto/CreateTaskRequest.dto";
import { Tasks } from "../../model/Tasks.model";

export interface ITaskRepository{
     createTask ( createTaskRequest:CreateTaskRequest):Promise<Tasks>;
}