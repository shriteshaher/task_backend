import { CreateTaskRequest } from "../dto/CreateTaskRequest.dto";
import { Tasks } from "../model/Tasks.model";
import { ITaskRepository } from "./intl/task.repository.interface";

class TaskRepository implements ITaskRepository{
    createTask(createTaskRequest: CreateTaskRequest): Promise<Tasks> {
        return Tasks.create({
            name: createTaskRequest.name,
            status_id: createTaskRequest.status_id,
            prority_id: createTaskRequest.priority_id,
            durationStart: createTaskRequest.durationStart,
            durationEnd: createTaskRequest.durationEnd,
        });
    }


}

export const taskRepository = new TaskRepository();
