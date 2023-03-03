import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAddressComponent } from './add-address/add-address.component';
import { AddressComponent } from './address.component';
import { EditAddressComponent } from './edit-address/edit-address.component';
import { ViewAddressDetailsComponent } from './view-address-details/view-address-details.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'address',
    },
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'view' },
      {
        path: 'view',
        component: AddressComponent,
        data: {
          title: 'All addresses',
        },
      },
      {
        path: 'add',
        component: AddAddressComponent,
        data: {
          title: 'create address',
        },
      },
      {
        path: 'edit/:id',
        component: EditAddressComponent,
        data: {
          title: 'edit address',
        },
      },
      {
        path: 'detail/:id',
        component: ViewAddressDetailsComponent,
        data: {
          title: 'Address detail',
        },
      },
    ],


  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddressRoutingModule { }
