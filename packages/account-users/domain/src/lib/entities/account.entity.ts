import { Name } from "../interfaces/name";

// TODO: talvez refactor para algo mais consistente
export interface Account {
    id: string;
    name: Name;
    email: string;
    password: string;
}