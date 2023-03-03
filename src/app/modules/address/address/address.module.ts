import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddressRoutingModule } from './address-routing.module';
import { AddressComponent } from './address.component';
import {
  AvatarModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  NavModule,
  ProgressModule,
  DropdownModule,
  TableModule,
  AccordionModule,
  SharedModule,
  TabsModule,
  WidgetModule,
  PaginationModule,
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { WidgetsModule } from '../../../views/widgets/widgets.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddAddressComponent } from './add-address/add-address.component';
import { EditAddressComponent } from './edit-address/edit-address.component';
import { AuthService } from 'src/app/services/auth.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AddressPipePipe } from '../../../address-pipe.pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ViewAddressDetailsComponent } from './view-address-details/view-address-details.component';


@NgModule({
  declarations: [
    AddressComponent,
    AddAddressComponent,
    EditAddressComponent,
    AddressPipePipe,
    ViewAddressDetailsComponent
  ],
  imports: [
    CommonModule,
    AddressRoutingModule,
    CardModule,
    NavModule,
    IconModule,
    TabsModule,
    CommonModule,
    GridModule,
    ProgressModule,
    ReactiveFormsModule,
    ButtonModule,
    FormModule,
    ButtonModule,
    ButtonGroupModule,
    ChartjsModule,
    AvatarModule,
    TableModule,
    WidgetsModule,
    PaginationModule,
    ReactiveFormsModule,
    WidgetModule,
    FormsModule,
    NgxPaginationModule,
    MatPaginatorModule,
    Ng2SearchPipeModule,
    DropdownModule,
    AccordionModule,
    SharedModule





  ],
  providers: [AuthService]
})
export class AddressModule { }
