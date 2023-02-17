import { Component } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Cities, Parishes } from '../addresses';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss']
})
export class AddAddressComponent {
  submitted = false;

  parishes: string[] = Parishes
  cities: string[] = Cities

  addressForm = new FormGroup({
    'Address_1': new FormControl('', [Validators.required]),
    'Address_2': new FormControl('', [Validators.required]),
    'parish': new FormControl('', [Validators.required]),
    'city': new FormControl('', [Validators.required]),

  })



  onSubmit() {
    this.submitted = true

  }



}
