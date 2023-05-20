import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario.model';
import { JwtService } from 'src/app/service/jwt.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
  usuario: Usuario;
  listaUsuarios: Usuario[] = []
  constructor(private userService: UsuarioService,private jwt:JwtService){}

  ngOnInit(){
    this.getUsuario();
    this.usuario = this.jwt.checkToken()
  }

  getUsuario():void{
    this.userService.getUserList().subscribe((data: Usuario[]) =>{
      this.listaUsuarios = data;
    })
  }
}
