import { taskService } from "../services/task.service";
import { CreateTaskRequest } from "../dto/CreateTaskRequest.dto";
import { UpdateTaskRequest } from "../dto/UpdateTaskRequest.dto";
import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../types/api-response";
import { Tasks } from "../model/Tasks.model";
import { TaskFilters } from "../validators/task.validator";

type TaskIdParams = { id: string };

export const createTask = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const taskCreateRequest = request.body as CreateTaskRequest;
    const createdTask = await taskService.createTask(taskCreateRequest);

    const apiResponse: ApiResponse<Tasks> = {
      success: true,
      message: "Task created successfully",
      data: createdTask,
    };

    return response.status(201).json(apiResponse);
  } catch (error) {
    next(error);
  }
};

export const getTasks = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const tasks = await taskService.getTasks(request.query as TaskFilters);

    const apiResponse: ApiResponse<Tasks[]> = {
      success: true,
      message: "Tasks fetched successfully",
      data: tasks,
    };

    return response.status(200).json(apiResponse);
  } catch (error) {
    next(error);
  }
};

export const getTaskById = async (request: Request<TaskIdParams>, response: Response, next: NextFunction) => {
  try {
    const task = await taskService.getTaskById(request.params.id);

    const apiResponse: ApiResponse<Tasks> = {
      success: true,
      message: "Task fetched successfully",
      data: task,
    };

    return response.status(200).json(apiResponse);
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (request: Request<TaskIdParams>, response: Response, next: NextFunction) => {
  try {
    const taskUpdateRequest = request.body as UpdateTaskRequest;
    const updatedTask = await taskService.updateTask(request.params.id, taskUpdateRequest);

    const apiResponse: ApiResponse<Tasks> = {
      success: true,
      message: "Task updated successfully",
      data: updatedTask,
    };

    return response.status(200).json(apiResponse);
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (request: Request<TaskIdParams>, response: Response, next: NextFunction) => {
  try {
    await taskService.deleteTask(request.params.id);

    const apiResponse: ApiResponse<null> = {
      success: true,
      message: "Task deleted successfully",
      data: null,
    };

    return response.status(200).json(apiResponse);
  } catch (error) {
    next(error);
  }
};
