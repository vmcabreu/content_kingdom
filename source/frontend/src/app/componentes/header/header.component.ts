import { Component } from '@angular/core';
import { Perfil } from 'src/app/model/perfil.mode';
import { Usuario } from 'src/app/model/usuario.model';
import { JwtService } from 'src/app/service/jwt.service';
import { PerfilService } from 'src/app/service/perfil.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  usuario: Usuario = null;
  perfil: Perfil = null;

  constructor(private jwt: JwtService,private perfilService: PerfilService) { }

  ngOnInit() {
    this.getUsuario();


  }


  getUsuario() {
    let token = localStorage.getItem('token')
    if (token != "") {
      this.usuario = this.jwt.decodeUsuario(token);
      this.getPerfil();
    }
  }

  getPerfil(){
    this.perfilService.getProfilebyUserID(this.usuario.id).subscribe((data: Perfil) => {
      this.perfil = data;
    })
  }

  logOut(){
    let token = localStorage.setItem('token',"")
    window.location.reload();
  }
}
