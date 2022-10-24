import { Role } from "../role.enum";

export interface userDto {
  id?: number;
  name?: string;
  username?: string;
  tel?: string;
  email?: string;
  password?: string;
  role?: Role;
}
