import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario.model';
import { JwtService } from 'src/app/service/jwt.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {

  usuario: Usuario;
  modificarUsuario: boolean = false;
  editedUser:string="";

  constructor(private jwt:JwtService,private userService:UsuarioService,private router:Router){}

  ngOnInit(){
    this.usuario = this.jwt.checkToken()
  }

  modificarUser(){
    this.usuario.usuario = this.editedUser;
    this.userService.editUser(this.usuario).subscribe(response =>{
      if (response === 200) {
        Swal.fire({
          title: '¡Editado con éxito!',
          icon: 'success',
          timerProgressBar: true,
          background: '#151515',
          color: '#fff'
        })
      }
    })


  }

  deleteUsuario(){
    Swal.fire({
      title: '¡Editado con éxito!',
      icon: 'warning',
      background: '#151515',
      color: '#fff',
      confirmButtonText: "Borrar",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
    }).then((result)=>{
      if (result.isConfirmed) {
        this.userService.deleteUser(this.usuario.id).subscribe(response =>{
          if (response == 200) {
            Swal.fire({
              title: 'Eliminado con éxito!',
              icon: 'success',
              timerProgressBar: true,
              background: '#151515',
              color: '#fff'
            }).then(()=>{
              localStorage.setItem('token',"")
              this.router.navigateByUrl("/")
            })
          }
        })
      }
    })
  }


}
