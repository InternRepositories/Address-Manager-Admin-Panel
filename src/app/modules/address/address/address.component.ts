import { Component, OnInit } from '@angular/core';
import { Address } from 'src/app/models/addressModel';
import { Addresses } from './addresses'
import { AddressService } from './../../../services/address.service'
import { IParish } from './../../../interfaces/parish.interface'
import { ParishService } from './../../../services/parish.service'
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  addresses: Address[] = []
  allAddresses: number = 0
  pagination: number = 1
  totalAddresses: number = 0



  filteredItems: Address[] = []
  approved: boolean = true
  address_1!: string;
  city!: string;
  parish!: string;
  status!: string;
  parishes: IParish[] = []

  public searchFields: string[] = [];

  // public addresses: Address[] = Addresses;


  constructor(private addressService: AddressService, private ParishService: ParishService) { }
  searchUserHandler(): void {
    this.searchFields = [];
    // TODO implement logic to search
  }


  renderPage(event: number) {
    this.pagination = event
    this.getAllAddress();


  }

  getAllAddress() {
    this.addressService.getAllAddresses().subscribe(res => {
      this.addresses = res.data
      this.filteredItems = this.addresses
      console.log(res.data);

    })
  }

  getAllParish() {
    this.ParishService.getAllParishes().subscribe(res => {
      this.parishes = res.data
      console.log(this.parishes);



    })
  }

  deleteAddress(id: any): void {
    this.addressService.deleteAddress(id).subscribe(res => {
      alert('Address deleted successfully')
      this.getAllAddress();
    })
  }

  statusChange = new FormGroup({
    'status': new FormControl('1', [Validators.required]),
  })

  approveAddress(id: any): void {
    const formData = this.statusChange.value as Partial<Address>
    this.addressService.updateAddress(id, formData).subscribe(res => {
      alert('check Successful')
    })

  }

  searchedItems() {
    this.filteredItems = this.addresses.filter(address => {
      address.address_1.toLocaleLowerCase().includes(this.address_1.toLocaleLowerCase()) ||
        address.city.toLocaleLowerCase().includes(this.city.toLocaleLowerCase()) ||
        address.parish.toLocaleLowerCase().includes(this.parish.toLocaleLowerCase()) ||
        address.status.toLocaleLowerCase().includes(this.status.toLocaleLowerCase())

    })

  }




  ngOnInit() {
    this.getAllAddress()
    this.getAllParish()



  }

}
