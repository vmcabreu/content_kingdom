import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  nombre: string;
  passwd: string;
  url: String = "http://contentkingdom.alu6618.arkania.es/api/controller/";

  constructor(private http: HttpClient) {}

  login() {
    this.http.post(this.url+'login/login.php', {nombre: this.nombre, passwd: this.passwd}).subscribe(
      response => {
        localStorage.setItem('token', response['token']);
      }
    );
  }
}
