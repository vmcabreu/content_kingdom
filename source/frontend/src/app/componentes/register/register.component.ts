import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario.model';
import { LoginService } from 'src/app/service/login.service';
import { RegisterService } from 'src/app/service/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  nombre: string;
  passwd: string;
  repeatpasswd: string;
  email: string;
  error: string = "";
  newUser: Usuario=new Usuario();
  valid: boolean = false;

  constructor( private router: Router,private registerService: RegisterService) {

  }

  register() {
      this.registerService.registerUser(this.newUser).subscribe();
  }

  }



