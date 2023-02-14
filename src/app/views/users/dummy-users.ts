import { UserRole } from 'src/app/enums/user-role.enum';
import { UserStatus } from 'src/app/enums/user-status.enum';
import { User } from 'src/app/interfaces/user.interface';

export const DummyUsers: User[] = [
  {
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@mail.com',
    profile_image: '',
    mobile_number: '+1 (876) 456-7898',
    home_number: '+1 (876) 456-7898',
    role: UserRole.USER,
    createdAt: new Date(),
    updatedAt: new Date(),
    status: UserStatus.ACTIVE,
  },
];
