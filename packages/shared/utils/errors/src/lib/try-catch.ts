import { Success, Failure } from '@my-task-timer/shared-interfaces';

type Result<T, E = Error> = Success<T> | Failure<E>;

export async function tryCatch<T, E = Error>(
  promise: Promise<T>,
  errorHandler?: (error: unknown) => E
): Promise<Result<T, E>> {
  try {
    const data = await promise;
    return { data, error: null } as Success<T>;
  } catch (error) {
    const processedError = errorHandler
      ? errorHandler(error)
      : error as E;

    return { data: null, error: processedError } as Failure<E>;
  }
}
