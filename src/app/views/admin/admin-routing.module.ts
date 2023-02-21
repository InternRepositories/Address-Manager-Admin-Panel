import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AdminUserCreateComponent } from './admin-user-create/admin-user-create.component';
import { AdminUserUpdateComponent } from './admin-user-update/admin-user-update.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Admins',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: AdminComponent,
        data: { title: 'All Admin Users' },
      },
      {
        path: 'create',
        component: AdminUserCreateComponent,
        data: { title: 'Admin User Create' },
      },
      {
        path: 'update/:id',
        component: AdminUserUpdateComponent,
        data: { title: 'Admin User Update' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
