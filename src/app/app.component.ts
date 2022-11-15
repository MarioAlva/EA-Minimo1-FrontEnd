import { Component, ElementRef } from '@angular/core';
import navOptions from '../data/navOptions';
import { environment } from 'src/environments/environment';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
	openNav() {
		setTimeout(() => {
		this.navbarOpen = !this.navbarOpen;
		}, 1);
	}
  navOptions = navOptions;
  title = 'EA-FrontEnd';
  navbarOpen = false;
  logout() {
    environment.auth = null;
    window.location.href = '/login';
  }
}
