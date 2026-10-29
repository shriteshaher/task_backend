import { taskService } from "../services/task.service";
import { CreateTaskRequest } from "../dto/CreateTaskRequest.dto";
import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../types/api-response";
import { Tasks } from "../model/Tasks.model";

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