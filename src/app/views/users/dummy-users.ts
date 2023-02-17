import { UserRole } from 'src/app/enums/user-role.enum';
import { UserStatus } from 'src/app/enums/user-status.enum';
import { User } from 'src/app/interfaces/user.interface';

export const DummyUsers: User[] = [
  {
    _id: '21344124412341',
    first_name: 'Jane',
    last_name: 'Malina',
    email: 'jane.doe@mail.com',
    profile_image: './assets/img/avatars/1.jpg',
    mobile_number: '+1 (876) 456-7898',
    home_number: '+1 (876) 456-7898',
    role: UserRole.USER,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: UserStatus.ACTIVE,
  },
  {
    _id: '213441244123412',
    first_name: 'Famila',
    last_name: 'Pine',
    email: 'jane.doe@mail.com',
    profile_image: './assets/img/avatars/1.jpg',
    mobile_number: '+1 (876) 456-7898',
    home_number: '+1 (876) 456-7898',
    role: UserRole.ADMIN,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: UserStatus.ACTIVE,
  },
  {
    _id: '213441244123413',
    first_name: 'Sherina',
    last_name: 'Fema',
    email: 'jane.doe@mail.com',
    profile_image: './assets/img/avatars/1.jpg',
    mobile_number: '+1 (876) 456-7898',
    home_number: '+1 (876) 456-7898',
    role: UserRole.ADMIN,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: UserStatus.ACTIVE,
  },
  {
    _id: '213441244123414',
    first_name: 'Jane',
    last_name: 'Doe',
    email: 'jane.doe@mail.com',
    profile_image: './assets/img/avatars/1.jpg',
    mobile_number: '+1 (876) 456-7898',
    home_number: '+1 (876) 456-7898',
    role: UserRole.ADMIN,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: UserStatus.ACTIVE,
  },
  {
    _id: '213441244123415',
    first_name: 'Jane',
    last_name: 'Doe',
    email: 'jane.doe@mail.com',
    profile_image: './assets/img/avatars/1.jpg',
    mobile_number: '+1 (876) 456-7898',
    home_number: '+1 (876) 456-7898',
    role: UserRole.USER,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: UserStatus.ACTIVE,
  },

  {
    _id: '213441244123416',
    first_name: 'Akelia',
    last_name: 'Donna',
    email: 'akelia.donna@mail.com',
    profile_image: './assets/img/avatars/2.jpg',
    mobile_number: '+1 (876) 456-7898',
    home_number: '+1 (876) 456-7898',
    role: UserRole.USER,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: UserStatus.ACTIVE,
  },
];
