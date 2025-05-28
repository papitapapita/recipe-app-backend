import { Role } from './Role';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  recoveryToken: string;
  role: Role;
}

export type UserInput = Omit<User, 'id'>;
export type PartialUserInput = Partial<Omit<User, 'id'>>;
