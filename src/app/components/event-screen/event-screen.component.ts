import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import axios from 'axios';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Event } from '../../models/Event';

@Component({
  selector: 'app-event-screen',
  templateUrl: './event-screen.component.html',
  styleUrls: ['./event-screen.component.css']
})
export class EventScreenComponent implements OnInit {



  listEvent : Event[] = [];

  constructor() { }

  ngOnInit(): void {
  
    this.getEvents();
  }

  nextCarrousel(){
	$('.home-carrousel').animate({
		scrollLeft: "+=300px"
	}, "slow");
  }

  backCarrousel(){
	$('.home-carrousel').animate({
		scrollLeft: "-=300px"
	}, "slow");
  }
  
  getEvents(){
		const response = axios.get('http://localhost:5432/api/events/', {
		}).then((response) => {
      this.listEvent = response.data;
		}).catch((error) => {
			console.log(error);
		});
	}

}