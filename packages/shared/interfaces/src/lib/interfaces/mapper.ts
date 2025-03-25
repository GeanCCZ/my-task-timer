export interface Mapper<T, R> {
  toEntity(input: T): R;

  toDto(domain: R): T;
}
