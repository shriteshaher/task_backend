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

type ErrorClass<E extends Error> = abstract new (...args: never[]) => E;
type ErrorMapper = (err: Error) => MappedError;

const entry = <E extends Error>(
  errorClass: ErrorClass<E>,
  mapper: (err: E) => MappedError
): [ErrorClass<Error>, ErrorMapper] => [errorClass, (err) => mapper(err as E)];

const fieldErrors = (err: ValidationError): FieldError[] =>
  err.errors.map((item) => ({ field: item.path, message: item.message }));

// The most specific class in an error's prototype chain wins, so entry order does not matter.
const errorMap = new Map<ErrorClass<Error>, ErrorMapper>([
  entry(UniqueConstraintError, (err) => ({ statusCode: 409, message: 'Already exists', errors: fieldErrors(err) })),
  entry(ValidationError, (err) => ({ statusCode: 400, message: 'Validation failed', errors: fieldErrors(err) })),
  entry(ForeignKeyConstraintError, () => ({ statusCode: 422, message: 'Referenced record does not exist' })),
  entry(ConnectionError, () => ({ statusCode: 503, message: 'Database unavailable' })),
  entry(TimeoutError, () => ({ statusCode: 503, message: 'Database timeout' })),
  entry(DatabaseError, () => ({ statusCode: 500, message: 'Database error' })),
]);

export function mapError(err: unknown): MappedError | undefined {
  if (!(err instanceof Error)) return undefined;

  for (let proto: object | null = Object.getPrototypeOf(err); proto; proto = Object.getPrototypeOf(proto)) {
    const mapper = errorMap.get(proto.constructor as ErrorClass<Error>);
    if (mapper) return mapper(err);
  }
  return undefined;
}
