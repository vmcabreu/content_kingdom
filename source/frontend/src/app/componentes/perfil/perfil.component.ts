import { Component } from '@angular/core';
import { Usuario } from 'src/app/model/usuario.model';
import { JwtService } from 'src/app/service/jwt.service';
import { PerfilService } from 'src/app/service/perfil.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {

  constructor(private perfilService: PerfilService,private jwt: JwtService){}

  usuario: Usuario;

  ngOnInit(){
    this.usuario= this.jwt.checkToken();
  }
}
