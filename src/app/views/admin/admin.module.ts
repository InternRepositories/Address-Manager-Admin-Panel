import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';

import {
  AvatarModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FormModule,
  GridModule,
  ListGroupModule,
  NavModule,
  TableModule,
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminUserCreateComponent } from './admin-user-create/admin-user-create.component';
import { AdminUserUpdateComponent } from './admin-user-update/admin-user-update.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { AdminUserDetailComponent } from './admin-user-detail/admin-user-detail.component';

@NgModule({
  declarations: [
    AdminComponent,
    AdminUserCreateComponent,
    AdminUserUpdateComponent,
    AdminUserDetailComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AvatarModule,
    ButtonGroupModule,
    ButtonModule,
    CardModule,
    DropdownModule,
    FormModule,
    NavModule,
    TableModule,
    IconModule,
    GridModule,
    ListGroupModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatListModule,
    PipesModule,
  ],
})
export class AdminModule { }
