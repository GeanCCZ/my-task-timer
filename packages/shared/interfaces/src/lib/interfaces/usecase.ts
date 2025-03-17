export interface Usecase<T, R> {
  execute(input: T): Promise<R>;
}
