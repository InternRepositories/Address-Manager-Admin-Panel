import { UserRole } from '../enums/user-role.enum';
import { UserStatus } from '../enums/user-status.enum';

export interface User {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
  profile_image: string;
  mobile_number: string;
  home_number: string;
  role: UserRole;
  status: UserStatus;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}
