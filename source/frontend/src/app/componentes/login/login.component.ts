import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario.model';
import { Auth } from 'src/app/model/auth.model';
import { LoginService } from 'src/app/service/login.service';
import { first, map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  nombre: string = "";
  passwd: string = "";
  error: string;

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
  }

    loginGenToken() {
      this.loginService.loginPostUser(this.nombre, this.passwd)
      .subscribe();
    }
    loginGetToken() {
      this.loginService.loginGetUser(this.nombre, this.passwd)
      .subscribe((data:any) => {
        console.log(data.token);

      });
    }

    onSubmit(){
      let order = 0;
      if (order == 0) {
        this.loginGenToken();
        order++;
      }
      if(order == 1){
        this.loginGetToken();
        order++;
      }

    }
}
