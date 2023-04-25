import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/service/auth-service.service';

interface Token {
  token: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  nombre: string;
  passwd: string;
  error: string;

  constructor(private auth: AuthServiceService, private router: Router) {}

    login() {
      this.auth.login(this.nombre, this.passwd).subscribe(
        (data:any )=> {
          const token = JSON.parse(data);
          console.log(token);
          localStorage.setItem('jwtToken', token);
        }
      );
    }
}
