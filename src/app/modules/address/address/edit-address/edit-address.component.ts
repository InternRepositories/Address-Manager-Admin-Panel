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

  constructor(private addressService: AddressService, private parishService: ParishService, private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  getAllParishes() {
    this.parishService.getAllParishes().subscribe(res => {
      this.parishes = res.data

    })

  }
  getAllUsers() {
    this.userService.getAll().subscribe(res => {
      this.users = res.data;
    })

  }

  updateAddress() {
    this.submitted = true
    this.addressService.updateAddress(this.address._id, this.addressForm.value).subscribe(res => {
      alert('address updated successfully')
      this.router.navigate(['/address/view'])


    })


  }


  ngOnInit() {
    this.getAllParishes()
    this.getAllUsers()
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




      // this.parishService.getAllParishes().subscribe(res => {
      //   const parishes = res.data
      //   const parish = parishes.filter((parish: { _id: any; }) => parish._id == res.data._id)[0];
      //   // this.addressForm.controls['parish'].setValue(parish._id);

      // })

    })


  }

}
