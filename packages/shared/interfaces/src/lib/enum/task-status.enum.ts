export const STATUS = {
    TODO: 'TODO',
    IN_PROGRESS: 'IN_PROGRESS',
    DONE: 'DONE'
} as const;

type ObjectValues<T> = T[keyof T];
export type Status = ObjectValues<typeof STATUS>;