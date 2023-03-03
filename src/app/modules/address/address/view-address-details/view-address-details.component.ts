import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IParish } from 'src/app/interfaces/parish.interface';
import { Address } from 'src/app/models/addressModel';
import { Users } from 'src/app/models/userModel';
import { AddressService } from 'src/app/services/address.service';
import { ParishService } from 'src/app/services/parish.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-address-details',
  templateUrl: './view-address-details.component.html',
  styleUrls: ['./view-address-details.component.scss']
})
export class ViewAddressDetailsComponent implements OnInit {

  address!: Address;
  user!: Users;
  addressId!: string;
  users: Users[] = []
  parishes: IParish[] = []
  submitted = false


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

  colors = [
    { color: 'primary', textColor: 'primary' },
    { color: 'secondary', textColor: 'secondary' },
    { color: 'success', textColor: 'success' },
    { color: 'danger', textColor: 'danger' },
    { color: 'warning', textColor: 'warning' },
    { color: 'info', textColor: 'info' },
    { color: 'light' },
    { color: 'dark' }
  ];


  constructor(private addressService: AddressService, private userService: UserService, private router: Router,
    private route: ActivatedRoute, private parishService: ParishService) { }


  getAddressById(id: string) {
    this.addressService.getAddressById(id).subscribe(res => {
      this.address = res.data

      const _id: any = this.users.find((user) => this.address.user_id === user.email)?._id
      this.userService.getOne(_id).subscribe(res => {
        this.user = res.data


      })
    })
  }

  addressForm = new FormGroup({
    'address_1': new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(25)]),
    'address_2': new FormControl('', [Validators.minLength(10), Validators.maxLength(25,)]),
    'parish': new FormControl('', [Validators.required]),
    'city': new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(25,)]),
    'user_id': new FormControl('', [Validators.required]),
    'status': new FormControl('', [Validators.required]),


  })

  getAllUsers() {
    this.userService.getAll().subscribe(_results => {
      this.users = _results.data.users;

    })
  }

  getAllParishes() {
    this.parishService.getAllParishes().subscribe(res => {
      this.parishes = res.data
    })
  }

  onSubmit() {
    this.submitted = true
    const formData = this.addressForm.value as Partial<Address>
    console.log(formData);
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


  ngOnInit(): void {
    this.getAllUsers()
    this.route.params.subscribe((params: Params) => {
      this.addressId = params['id'];
      this.getAddressById(this.addressId);
    })

    this.getAllParishes()


  }



}