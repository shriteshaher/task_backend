import { InferCreationAttributes, Op } from "sequelize";
import { CreateTaskRequest } from "../dto/CreateTaskRequest.dto";
import { UpdateTaskRequest } from "../dto/UpdateTaskRequest.dto";
import { Tasks } from "../model/Tasks.model";
import { TaskStatus } from "../model/TaskStatus.model";
import { TaskPriority } from "../model/TaskPriority.model";
import { TaskFilters } from "../validators/task.validator";
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

    findAll(filters: TaskFilters): Promise<Tasks[]> {
        return Tasks.findAll({
            include: [
                {
                    model: TaskStatus,
                    as: 'status',
                    required: !!filters.status,
                    where: filters.status ? { status: filters.status } : undefined,
                },
                {
                    model: TaskPriority,
                    as: 'priority',
                    required: !!filters.priority,
                    where: filters.priority ? { prority: filters.priority } : undefined,
                },
            ],
            where: filters.name ? { name: { [Op.iLike]: `%${filters.name}%` } } : undefined,
            order: [['createdAt', 'DESC']],
        });
    }

    findById(id: string): Promise<Tasks | null> {
        return Tasks.findByPk(id);
    }

    async updateTask(id: string, updateTaskRequest: UpdateTaskRequest): Promise<Tasks | null> {
        const task = await Tasks.findByPk(id);
        if (!task) return null;

        const changes: Partial<InferCreationAttributes<Tasks>> = {};
        if (updateTaskRequest.name !== undefined) changes.name = updateTaskRequest.name;
        if (updateTaskRequest.status_id !== undefined) changes.status_id = updateTaskRequest.status_id;
        if (updateTaskRequest.priority_id !== undefined) changes.prority_id = updateTaskRequest.priority_id;
        if (updateTaskRequest.durationStart !== undefined) changes.durationStart = updateTaskRequest.durationStart;
        if (updateTaskRequest.durationEnd !== undefined) changes.durationEnd = updateTaskRequest.durationEnd;

        return task.update(changes);
    }

    async deleteTask(id: string): Promise<boolean> {
        const deletedCount = await Tasks.destroy({ where: { id } });
        return deletedCount > 0;
    }
}

export const taskRepository = new TaskRepository();
