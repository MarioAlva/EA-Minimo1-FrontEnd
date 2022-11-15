import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import axios from 'axios';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  createEventForm: FormGroup;
  submitted = false;
  clickCreateEvent: boolean;


  constructor(private formBuilder: FormBuilder, private _router: Router) { 
    this.createEventForm = this.formBuilder.group({});
    this.clickCreateEvent = false;
  }

  ngOnInit(): void {
    this.createEventForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      //owner: ['', Validators.required],
      //date: ['', Validators.required],
      //location: ['', Validators.required],
    });
  }
  onSubmit() {
    this.submitted = true;
  }
  sendCreateEvent(){
		if(!this.createEventForm.invalid){
		axios.post('http://localhost:5432/api/events/', {
			title: this.createEventForm.value.title,
			description: this.createEventForm.value.description,
		//	owner: this.createEventForm.value.owner,
		//	date: this.createEventForm.value.date,
			//location: this.createEventForm.value.location
		}).then((response) => {
			environment.auth = response.data.token;
			this._router.navigate(['/event-screen'])
		}).catch((error) => {
			console.log(error);
		});
	}
	}
}
