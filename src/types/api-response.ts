export interface FieldError {
  field: string | null;
  message: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
  errors?: FieldError[];
}
