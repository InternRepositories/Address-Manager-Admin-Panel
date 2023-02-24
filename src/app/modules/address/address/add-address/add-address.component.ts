import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { IParish } from 'src/app/interfaces/parish.interface';
import { ICity } from 'src/app/interfaces/citiy.interface';
import { User } from 'src/app/interfaces/user.interface';
import { Address } from 'src/app/models/addressModel';
import { Users } from 'src/app/models/userModel';
import { AddressService } from 'src/app/services/address.service';
import { ParishService } from 'src/app/services/parish.service';
import { UserService } from 'src/app/services/user.service';
import { Cities, Parishes } from '../addresses';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss']
})
export class AddAddressComponent implements OnInit {
  submitted = false;
  default = "Select"

  parishes: IParish[] = []
  users: any;
  cities: ICity[] = Cities

  addressForm = new FormGroup({
    'address_1': new FormControl('', [Validators.required]),
    'address_2': new FormControl('',),
    'parish': new FormControl('', [Validators.required]),
    'city': new FormControl('', [Validators.required]),
    'user_id': new FormControl('', [Validators.required])

  })

  constructor(private userService: UserService, private parishService: ParishService, private addressService: AddressService) { }



  getAllUSers() {
    this.userService.getAll().subscribe(res => {
      this.users = res.data
      console.log(res.data);


    })
  }

  getAllParishes() {
    this.parishService.getAllParishes().subscribe(res => {
      this.parishes = res.data
    })
  }




  onSubmit() {
    const fromData = this.addressForm.value as Partial<Address>
    this.submitted = true
    this.addressService.createAddress(fromData).subscribe({
      next: (res) => {
        alert('address Submitted Successfully')
      },
      error: (err) => {
        alert(err)
      }
    }
    )



  }

  ngOnInit() {
    this.getAllParishes()
    this.getAllUSers()
  }



}
