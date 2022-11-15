import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import axios from 'axios';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  registerForm: FormGroup;
  loginForm: FormGroup;

  submitted = false;
  clickRegister: boolean;
  clickLogin: boolean;
  clickForgot: boolean; 
  userDataErr: boolean = false;
  date: Date;
  uponAge: boolean = false;
  samepass: boolean = false;

  constructor(private formBuilder: FormBuilder, private _router: Router) {
    this.registerForm = this.formBuilder.group({});
    this.loginForm = this.formBuilder.group({});
    this.clickRegister = false;
    this.clickLogin = false;
    this.clickForgot = false;
    this.date = new Date();
  }

  ngOnInit(): void {
    console.log(environment.auth);
    if(environment.auth != null){
      this._router.navigate(['/']);
    }
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      repeatPass: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dateBirth: [ String(this.date.getFullYear() + '-' + this.date.getMonth() + "-" + this.date.getDate()), Validators.required],
    });
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    let date = new Date();
    let birthday = new Date(this.registerForm.value.dateBirth);
    this.submitted = true;
    if (birthday.getFullYear() === date.getFullYear() - 13) {
      if(birthday.getFullYear() === date.getFullYear() - 13 && birthday.getMonth() <= date.getMonth()) {
        if(birthday.getFullYear() === date.getFullYear() - 13 && birthday.getMonth() === date.getMonth() && birthday.getDate() <= date.getDate()) {
          this.uponAge = true;
        }
        else{
          this.uponAge = false;
        }
      }
      else{
        this.uponAge = false;
      }
    } else if (birthday.getFullYear() < date.getFullYear() - 13) {
      this.uponAge = true;
    }else {
      this.uponAge = false;
    } 
	if(this.registerForm.value.password === this.registerForm.value.repeatPass){
		this.samepass = true;
	}else{
		this.samepass = false;
	}
	if (this.registerForm.invalid || !this.uponAge || !this.samepass) {
		return;
	}
	}
	sendRegister(){
		if(!this.registerForm.invalid && this.uponAge && this.samepass){
		axios.post('http://localhost:5432/api/users/register', {
			name: this.registerForm.value.name,
			username: this.registerForm.value.username,
			password: this.registerForm.value.password,
			email: this.registerForm.value.email,
			birthdate: this.registerForm.value.dateBirth
		}).then((response) => {
			environment.auth = response.data.token;
			this._router.navigate(['/'])
		}).catch((error) => {
			console.log(error);
		});
	}
	}

  sendLogin(){
    if(!this.loginForm.invalid){
     axios.post('http://localhost:5432/api/users/login', {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      }).then((response) => {
       environment.auth = response.data.token;
        this._router.navigate(['/'])
      }).catch((error) => {
        console.log(error);
        if (error.response.status === 404)
          this.userDataErr=true;
      });
    }
  }

}
