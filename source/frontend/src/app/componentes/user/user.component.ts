import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario.model';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
  usuario: Usuario;
  constructor(private userService: UsuarioService){}

  ngOnInit(){
    this.getUsuario();
  }

  getUsuario():void{

  }
}
