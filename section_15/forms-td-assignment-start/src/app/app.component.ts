import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f') subscriptionForm: NgForm;
defaultSubscription: string = 'advanced';
submitted: boolean = false;
formData = {
  email: '',
  subscription: '',
  password: ''
}
onSubmit(){
  this.submitted = true;

  this.formData.email = this.subscriptionForm.value.email;
  this.formData.subscription = this.subscriptionForm.value.subscription;
  this.formData.password = this.subscriptionForm.value.password;

  this.subscriptionForm.reset();

  console.log(this.subscriptionForm)
}
}
