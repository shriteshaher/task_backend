import {
  ConnectionError,
  DatabaseError,
  ForeignKeyConstraintError,
  TimeoutError,
  UniqueConstraintError,
  ValidationError,
} from 'sequelize';
import { FieldError } from '../types/api-response';

export interface MappedError {
  statusCode: number;
  message: string;
  errors?: FieldError[];
}

interface ErrorRule {
  errorClass: abstract new (...args: never[]) => Error;
  toResponse: (err: Error) => MappedError;
}

const fieldErrors = (err: ValidationError): FieldError[] =>
  err.errors.map((item) => ({ field: item.path, message: item.message }));

// Rules are checked top to bottom and the first match wins.
// Always put a child class above its parent class, e.g.
// UniqueConstraintError (extends ValidationError) above ValidationError,
// ForeignKeyConstraintError / TimeoutError (extend DatabaseError) above DatabaseError.
const errorRules: ErrorRule[] = [
  {
    errorClass: UniqueConstraintError,
    toResponse: (err) => ({ statusCode: 409, message: 'Already exists', errors: fieldErrors(err as ValidationError) }),
  },
  {
    errorClass: ValidationError,
    toResponse: (err) => ({ statusCode: 400, message: 'Validation failed', errors: fieldErrors(err as ValidationError) }),
  },
  {
    errorClass: ForeignKeyConstraintError,
    toResponse: () => ({ statusCode: 422, message: 'Referenced record does not exist' }),
  },
  {
    errorClass: ConnectionError,
    toResponse: () => ({ statusCode: 503, message: 'Database unavailable' }),
  },
  {
    errorClass: TimeoutError,
    toResponse: () => ({ statusCode: 503, message: 'Database timeout' }),
  },
  {
    errorClass: DatabaseError,
    toResponse: () => ({ statusCode: 500, message: 'Database error' }),
  },
];

export function mapError(err: unknown): MappedError | undefined {
  if (!(err instanceof Error)) return undefined;

  const rule = errorRules.find((r) => err instanceof r.errorClass);
  return rule?.toResponse(err);
}
