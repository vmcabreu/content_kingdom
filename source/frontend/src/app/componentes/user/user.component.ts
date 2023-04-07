import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario.model';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  usuario: Usuario;
  success: String = "";
  error: String = "";
  constructor(private userService: UsuarioService){}

  ngOnInit(){
    this.getUsuario;
  }

  getUsuario():void{
    this.userService.getUser().subscribe(
      (data: Usuario) => {
        console.log(data);
        this.usuario = data;
        this.success = 'successful retrieval of the list';
      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }
}
