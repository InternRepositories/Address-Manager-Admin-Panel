import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AdminUserCreateComponent } from './admin-user-create/admin-user-create.component';
import { AdminUserUpdateComponent } from './admin-user-update/admin-user-update.component';
import { AdminUserDetailComponent } from './admin-user-detail/admin-user-detail.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: AdminComponent,
        data: { title: 'Admin Users' },
      },
      {
        path: 'create',
        component: AdminUserCreateComponent,
        data: { title: 'Create Admin' },
      },
      {
        path: 'update/:id',
        component: AdminUserUpdateComponent,
        data: { title: 'Edit Admin' },
      },
      {
        path: ':id',
        component: AdminUserDetailComponent,
        data: { title: 'View Admin' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
