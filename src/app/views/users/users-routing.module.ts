import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from '../users/users.component';

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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
