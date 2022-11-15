import { Component, OnInit } from '@angular/core';
import series from '../../../data/series';
import * as $ from 'jquery';
import axios from 'axios';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Serie } from '../../models/Serie';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  listSeries : Serie[] = [];


  constructor() { }

  ngOnInit(): void {
    this.getSeries();
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

  getSeries(){
		const response = axios.get('http://localhost:5432/api/series/', {
		}).then((response) => {
      this.listSeries = response.data;
		}).catch((error) => {
			console.log(error);
		});
	}

 
  /*async function getUser() {
  try {
    const response = await axios.get('/user?ID=12345');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}*/

  series = series;
  

}
