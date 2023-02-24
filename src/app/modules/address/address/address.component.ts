import { Component, OnInit } from '@angular/core';
import { Address } from 'src/app/models/addressModel';
import { Addresses } from './addresses'
import { AddressService } from './../../../services/address.service'
import { IParish } from './../../../interfaces/parish.interface'
import { ParishService } from './../../../services/parish.service'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  addresses: Address[] = []
  _addresses: any[] = []

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
      this._addresses = res.data
      for (let i = 0; i < this._addresses.length; i++) {
        // const parishName = this.mapParishes(this._addresses[i]['parish'])
        console.log("Parish", this.addresses[i].parish);
        console.log("Parish ID", this.parishes[i]._id);

        const parishName = this.parishes.find((parish) => this.addresses[i].parish === parish._id)?.parishName || 'Parish not found'
        console.log(parishName);

        // this._addresses[i]['parishName'] = parishName;

      }
    })
  }

  getAllParish() {
    this.ParishService.getAllParishes().subscribe(res => {
      this.parishes = res.data

      console.log(this.parishes);



    })
  }

  mapParishes(id: string | undefined) {
    const matchParishes = this.parishes.filter((parish) => {
      return parish._id === id
    })
    return matchParishes[0]?.parishName
  }



  deleteAddress(id: any): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        this.addressService.deleteAddress(id).subscribe(res => {
          Swal.fire('Address deleted successfully')
          this.getAllAddress();
        })
      }
    })

  }

  statusChange = new FormGroup({
    'status': new FormControl('1', [Validators.required]),
  })

  approveAddress(id: any): void {
    const formData = this.statusChange.value as Partial<Address>
    this.addressService.updateAddress(id, formData).subscribe(res => {
      Swal.fire('check Successful')
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


  // TODO Error fix, parish and get all addresses are being ran at seperate tmes due to thme being asynchronous

  ngOnInit() {
    this.getAllAddress()
    this.getAllParish()



  }

}
