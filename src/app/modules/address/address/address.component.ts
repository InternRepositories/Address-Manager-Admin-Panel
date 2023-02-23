import { Component, OnInit } from '@angular/core';
import { Address } from 'src/app/models/addressModel';
import { Addresses } from './addresses'
import { AddressService } from './../../../services/address.service'

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  addresses: Address[] = []
  filteredItems: Address[] = []
  approved: boolean = true
  // public searchBar: Partial<Address> = <Address>{
  //   Address_1: '',
  //   Address_2: '',
  //   city: '',
  //   parish: '',
  //   status: ''
  // };
  Address_1!: string;
  city!: string;
  parish!: string;
  status!: string;

  public searchFields: string[] = [];

  // public addresses: Address[] = Addresses;


  constructor(private addressService: AddressService) { }
  searchUserHandler(): void {
    this.searchFields = [];
    // TODO implement logic to search
  }

  getAllAddress() {
    this.addressService.getAllAddresses().subscribe(res => {
      this.addresses = res.data
      this.filteredItems = this.addresses
      console.log(res.data);

    })
  }

  searchedItems() {
    this.filteredItems = this.addresses.filter(address => {
      address.Address_1.toLocaleLowerCase().includes(this.Address_1.toLocaleLowerCase()) ||
        address.city.toLocaleLowerCase().includes(this.city.toLocaleLowerCase()) ||
        address.parish.toLocaleLowerCase().includes(this.parish.toLocaleLowerCase()) ||
        address.status.toLocaleLowerCase().includes(this.status.toLocaleLowerCase())

    })

  }




  ngOnInit() {
    this.getAllAddress()



  }

}
