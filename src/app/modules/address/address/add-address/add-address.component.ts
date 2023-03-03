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
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

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
  statuses: any[] = [
    {
      _id: 0,
      statusName: "PENDING"

    },
    {
      _id: 1,
      statusName: "APPROVED"

    },
  ]

  addressForm = new FormGroup({
    'address_1': new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(25)]),
    'address_2': new FormControl('', [Validators.minLength(10), Validators.maxLength(25,)]),
    'parish': new FormControl('', [Validators.required]),
    'city': new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(25,)]),
    'user_id': new FormControl('', [Validators.required]),
    'status': new FormControl('', [Validators.required]),


  })

  constructor(private userService: UserService, private parishService: ParishService, private addressService: AddressService, private router: Router) { }



  getAllUSers() {
    this.userService.getAll().subscribe(res => {
      this.users = res.data.users
      console.log(this.users);


    })
  }

  getAllParishes() {
    this.parishService.getAllParishes().subscribe(res => {
      this.parishes = res.data
    })
  }




  onSubmit() {
    const formData = this.addressForm.value as Partial<Address>
    console.log(formData);

    this.submitted = true
    if (this.addressForm.valid) {
      this.addressService.createAddress(formData).subscribe({
        next: (res) => {
          console.log(res);
          Swal.fire('Address Submitted Successfully'),
            this.router.navigate(['/address/view'])
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err,
          })
        }
      }
      )
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Invalid Form Submission  '
      })
    }



  }

  ngOnInit() {
    this.getAllParishes()
    this.getAllUSers()
  }



}
