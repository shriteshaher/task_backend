import { CreateTaskRequest } from "../dto/CreateTaskRequest.dto";
import { ITaskRepository } from "../repository/intl/task.repository.interface";
import { taskRepository } from "../repository/task.repository";

class TaskService {
   constructor(
    private readonly taskRepository: ITaskRepository
  ) {}

    createTask(createTaskRequest: CreateTaskRequest){
      return this.taskRepository.createTask(createTaskRequest)
    }
}

export const taskService=new TaskService(taskRepository)