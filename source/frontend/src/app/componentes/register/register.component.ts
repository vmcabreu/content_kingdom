import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/model/usuario.model';
import { LoginService } from 'src/app/service/login.service';
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
  newUser: Usuario=new Usuario();
  valid: boolean = false;

  suscription: Subscription;

  constructor( private router: Router,private registerService: RegisterService, private userService: UsuarioService) {

  }

  ngOnInit(){
    this.suscription = this.registerService.getRefresh$.subscribe()
  }

  register() {
      this.registerService.registerUser(this.newUser).subscribe(response =>{
        if (response.status == 200) {
          Swal.fire({
            title: '¡Registro correcto!',
            icon: 'success',
            timerProgressBar: true,
          }).then((result) => {
            this.ngOnInit();
          })
        }
      });
  }

  }



