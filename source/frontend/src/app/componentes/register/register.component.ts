import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Auth } from 'src/app/model/auth.model';
import { Usuario } from 'src/app/model/usuario.model';
import { LoginService } from 'src/app/service/login.service';
import { PerfilService } from 'src/app/service/perfil.service';
import { RegisterService } from 'src/app/service/register.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import Swal from 'sweetalert2';

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
  newUser: Usuario = new Usuario();
  valid: boolean = false;

  suscription: Subscription;

  constructor(private router: Router, private registerService: RegisterService, private loginService: LoginService) {

  }

  ngOnInit() {
    this.suscription = this.registerService.getRefresh$.subscribe()
  }

  register() {
    this.registerService.registerUser(this.newUser).subscribe({
      next: (res:any)=>{
          Swal.fire({
            title: '¡Registro correcto!',
            icon: 'success',
            timerProgressBar: true,
            background: '#151515',
            color: '#fff'
          }).then((result) => {
            this.router.navigateByUrl("/login");
          })
      },
      error: (error:HttpErrorResponse)=>{
        Swal.fire({
          title: '¡Registro fallido!',
          text: 'El usuario ya existe',
          icon: 'error',
          timerProgressBar: true,
          background: '#151515',
          color: '#fff'
        })
      }
    });
  }


  userLogged() {
    let token = localStorage.getItem('token')
    if (token !== "" && token !== undefined) {
      this.router.navigateByUrl("/");
    }
  }
}



