import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-users-update',
  templateUrl: './users-update.component.html',
  styleUrls: ['./users-update.component.css']
})
export class UsersUpdateComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  clickRegister: boolean;
  clickLogin: boolean;
  clickForgot: boolean; 
  userDataErr: boolean = false;
  date: Date;
  uponAge: boolean = false;
  samepass: boolean = false;

  user:User={
    _id:"",
    name:"",
	  username:"",
	  password:"",
	  birthdate:new Date(),
	  email:""
  }
  constructor(private formBuilder: FormBuilder, private _router: Router, private activedRoute: ActivatedRoute) {
    this.registerForm = this.formBuilder.group({});
    this.clickRegister = true;
    this.clickLogin = false;
    this.clickForgot = false;
    this.date = new Date();
   }

  ngOnInit(): void {
    const params = this.activedRoute.snapshot.params;
    console.log(params);
    this.getUser(params._id);
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      repeatPass: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dateBirth: [ String(this.user.birthdate.getFullYear() + '-' + this.user.birthdate.getMonth() + "-" + this.user.birthdate.getDate()), Validators.required],
    });
  }
  getUser(id:String){
		const response = axios.get(`http://localhost:5432/api/users/profile/${id}`, {
		}).then((response) => {
      console.log(response);
      this.user=response.data;
		}).catch((error) => {
			console.log(error);
		});
    
	}
  updateUser() {
    axios.put(`http://localhost:5432/api/users/`, {
      _id: this.user._id,
			name: this.registerForm.value.name,
			username: this.registerForm.value.username,
			email: this.registerForm.value.email,
			birthdate: this.registerForm.value.dateBirth
		})
    .then((response) => {
      this._router.navigate(['/userlist'])
    }).catch((error) => {
      console.log(error);
    });
    //return this.http.put(`${this.API_URI}/`, user);
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

}
