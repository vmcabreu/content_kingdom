import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router){}
  title = 'frontend';
  ruta = this.router

  checkLogin(){
    return this.ruta.url.includes("login") || this.ruta.url.includes("register") ;
  }
}
