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
  NavModule,
  TableModule,
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminUserCreateComponent } from './admin-user-create/admin-user-create.component';
import { AdminUserUpdateComponent } from './admin-user-update/admin-user-update.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
// import { PipesModule } from 'src/app/modules/pipes/pipes.module';

@NgModule({
  declarations: [
    AdminComponent,
    AdminUserCreateComponent,
    AdminUserUpdateComponent,
  ],
  imports: [
    MatSnackBarModule,
    CommonModule,
    AdminRoutingModule,
    AvatarModule,
    ButtonGroupModule,
    ButtonModule,
    CardModule,
    DropdownModule,
    FormModule,
    NavModule,
    TableModule,
    ReactiveFormsModule,
    FormsModule,
    MatPaginatorModule,
    IconModule,
    GridModule,
    // PipesModule,
  ],
})
export class AdminModule { }
