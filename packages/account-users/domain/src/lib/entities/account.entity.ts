import { Name } from "../interfaces/name";

export interface Account {
    id: string;
    name: Name;
    email: string;
    password: string;
}
