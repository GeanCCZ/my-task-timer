export interface Mapper<T, R> {
  toDomain(input: T): R;

  toPersistence(domain: R): T;
}
