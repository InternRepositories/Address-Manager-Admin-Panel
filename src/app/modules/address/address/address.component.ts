import { Component } from '@angular/core';
import { Address } from 'src/app/models/addressModel';
import { Addresses } from './addresses'

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent {
  approved: boolean = true

  public addresses: Address[] = Addresses;

}
