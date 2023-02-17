import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from '../users/users.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserUpdateComponent } from './user-update/user-update.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Users',
    },
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'view' },
      {
        path: 'view',
        component: UsersComponent,
        data: {
          title: 'All Users',
        },
      },
      {
        path: 'create',
        component: UserCreateComponent,
        data: {
          title: 'Create User',
        },
      },
      {
        path: 'update/:id',
        component: UserUpdateComponent,
        data: {
          title: 'Update User',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
