import {
  ConnectionError,
  DatabaseError,
  ForeignKeyConstraintError,
  TimeoutError,
  UniqueConstraintError,
  ValidationError,
} from 'sequelize';

export interface MappedError {
  statusCode: number;
  message: string;
  errors?: unknown;
}

type ErrorClass<E> = abstract new (...args: any[]) => E;
type ErrorMapper = (err: any) => MappedError;

const entry = <E>(errorClass: ErrorClass<E>, mapper: (err: E) => MappedError): [Function, ErrorMapper] => [
  errorClass,
  mapper,
];

const fieldErrors = (err: ValidationError) =>
  err.errors.map((item) => ({ field: item.path, message: item.message }));

// The most specific class in an error's prototype chain wins, so entry order does not matter.
const errorMap = new Map<Function, ErrorMapper>([
  entry(UniqueConstraintError, (err) => ({ statusCode: 409, message: 'Already exists', errors: fieldErrors(err) })),
  entry(ValidationError, (err) => ({ statusCode: 400, message: 'Validation failed', errors: fieldErrors(err) })),
  entry(ForeignKeyConstraintError, () => ({ statusCode: 422, message: 'Referenced record does not exist' })),
  entry(ConnectionError, () => ({ statusCode: 503, message: 'Database unavailable' })),
  entry(TimeoutError, () => ({ statusCode: 503, message: 'Database timeout' })),
  entry(DatabaseError, () => ({ statusCode: 500, message: 'Database error' })),
]);

export function mapError(err: unknown): MappedError | undefined {
  if (typeof err !== 'object' || err === null) return undefined;

  for (let proto = Object.getPrototypeOf(err); proto; proto = Object.getPrototypeOf(proto)) {
    const mapper = errorMap.get(proto.constructor);
    if (mapper) return mapper(err);
  }
  return undefined;
}
