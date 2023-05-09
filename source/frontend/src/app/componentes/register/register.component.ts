import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
  newUser: Usuario=new Usuario();
  valid: boolean = false;

  suscription: Subscription;

  constructor( private router: Router,private registerService: RegisterService, private userService: UsuarioService,private perfilService: PerfilService) {

  }

  ngOnInit(){
    this.suscription = this.registerService.getRefresh$.subscribe()
    this.suscription = this.perfilService.getRefresh$.subscribe()
    this.suscription = this.perfilService.getRefresh$.subscribe(()=>{
      this.userLogged();
    })
  }

  register() {
      this.registerService.registerUser(this.newUser).subscribe(response =>{
        if (response.status == 200) {
          this.userService.getUserByUsername(this.nombre).subscribe((data: Usuario) =>{
            this.generarPerfil(data.id);
          })
        }
      });
  }

  generarPerfil(id: number){
    this.perfilService.generateEmptyProfile(id).subscribe(response => {
      if (response.status == 200) {
        Swal.fire({
          title: '¡Registro correcto!',
          icon: 'success',
          timerProgressBar: true,
        }).then((result) => {
          this.userLogged();
        })
      }
    })
  }

  userLogged() {
    let token = localStorage.getItem('token')
    if (token !== "" && token !== undefined) {
      this.router.navigateByUrl("/");
    }
  }
  }



