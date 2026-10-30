import { CreateTaskRequest } from "../dto/CreateTaskRequest.dto";
import { UpdateTaskRequest } from "../dto/UpdateTaskRequest.dto";
import { NotFoundError } from "../errors/AppError";
import { Tasks } from "../model/Tasks.model";
import { ITaskRepository } from "../repository/intl/task.repository.interface";
import { taskRepository } from "../repository/task.repository";
import { TaskFilters } from "../validators/task.validator";

class TaskService {
   constructor(
    private readonly taskRepository: ITaskRepository
  ) {}

    createTask(createTaskRequest: CreateTaskRequest){
      return this.taskRepository.createTask(createTaskRequest)
    }

    getTasks(filters: TaskFilters): Promise<Tasks[]> {
      return this.taskRepository.findAll(filters)
    }

    async getTaskById(id: string): Promise<Tasks> {
      const task = await this.taskRepository.findById(id)
      if (!task) throw new NotFoundError('Task not found')
      return task
    }

    async updateTask(id: string, updateTaskRequest: UpdateTaskRequest): Promise<Tasks> {
      const task = await this.taskRepository.updateTask(id, updateTaskRequest)
      if (!task) throw new NotFoundError('Task not found')
      return task
    }

    async deleteTask(id: string): Promise<void> {
      const deleted = await this.taskRepository.deleteTask(id)
      if (!deleted) throw new NotFoundError('Task not found')
    }
}

export const taskService=new TaskService(taskRepository)
