import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICity } from 'src/app/interfaces/citiy.interface';
import { IParish } from 'src/app/interfaces/parish.interface';
import { Address } from 'src/app/models/addressModel';
import { AddressService } from 'src/app/services/address.service';
import { ParishService } from 'src/app/services/parish.service';
import { UserService } from 'src/app/services/user.service';
import { Cities } from '../addresses';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.scss']
})
export class EditAddressComponent implements OnInit {
  submitted = false;
  parishes: IParish[] = []
  cities: ICity[] = Cities;
  users: any;
  address!: Address
  addressForm!: FormGroup;
  statuses: any[] = []

  constructor(private addressService: AddressService, private parishService: ParishService, private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  getAllParishes() {
    this.parishService.getAllParishes().subscribe(res => {
      this.parishes = res.data


    })

  }
  getAllUsers() {
    this.addressService.getLimitedUsers().subscribe(res => {
      this.users = res.data.users;

    })

  }

  getStatuses() {
    this.addressService.getAllStatus().subscribe(res => {
      this.statuses = res.data.status_list
    })
  }

  updateAddress() {
    this.submitted = true
    console.log(this.addressForm.value);

    this.addressService.updateAddress(this.address._id, this.addressForm.value).subscribe(res => {
      Swal.fire('address updated successfully')
      console.log(res);
      this.router.navigate(['/address/view'])


    })


  }


  ngOnInit() {
    this.getAllUsers()
    this.getAllParishes()
    this.getStatuses()
    this.addressService.getAddressById(this.route.snapshot.params['id']).subscribe(res => {
      this.address = res.data




      this.addressForm = new FormGroup({
        'address_1': new FormControl(res.data.address_1, [Validators.required]),
        'address_2': new FormControl(res.data.address_2,),
        'parish': new FormControl(res.data.parish, [Validators.required]),
        'city': new FormControl(res.data.city, [Validators.required]),
        'user_id': new FormControl(res.data.user_id, [Validators.required]),
        'status': new FormControl(res.data.status, [Validators.required])

      })
      this.parishService.getAllParishes().subscribe(_results => {
        const parishes = _results.data;
        const parish = parishes.filter((parish: {
          parishName: any; _id: any;
        }) => parish.parishName == res.data.parish)[0];

        this.addressForm.controls['parish'].setValue(parish._id);

      })

      this.addressService.getLimitedUsers().subscribe(_results => {
        const users = _results.data.users
        console.log(_results.data.users);

        const user = users.filter((user: {
          email: any; _id: any;
        }) => user.email == res.data.user_id)[0]

        console.log(user);
        this.addressForm.controls['user_id'].setValue(user._id);

      })




    })


  }

}
