import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import { mapError, MappedError } from "../errors/errorMap";
import { ApiResponse } from "../types/api-response";

const INTERNAL_ERROR: MappedError = { statusCode: 500, message: "Internal Server Error" };

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const mapped: MappedError =
    err instanceof AppError
      ? { statusCode: err.statusCode, message: err.message, errors: err.errors }
      : mapError(err) ?? INTERNAL_ERROR;

  if (mapped.statusCode >= 500) {
    console.error(err);
  }

  const body: ApiResponse<null> = {
    success: false,
    message: mapped.message,
    data: null,
    ...(mapped.errors !== undefined && { errors: mapped.errors }),
  };

  res.status(mapped.statusCode).json(body);
};
