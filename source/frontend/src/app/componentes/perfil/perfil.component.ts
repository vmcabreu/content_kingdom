import { Component } from '@angular/core';
import { Perfil } from 'src/app/model/perfil.mode';
import { Publicacion } from 'src/app/model/publicacion.model';
import { Usuario } from 'src/app/model/usuario.model';
import { JwtService } from 'src/app/service/jwt.service';
import { PerfilService } from 'src/app/service/perfil.service';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {

  constructor(private perfilService: PerfilService,private postService: PostService,private jwt: JwtService){}

  usuario: Usuario;
  listaPublicaciones: Publicacion[] = [];
  perfil: Perfil;


  ngOnInit(){
    this.usuario= this.jwt.checkToken();
    this.getPublicacionesUsuario();
    this.getPerfil();
  }

  getNumberPosts(){
    console.log(this.listaPublicaciones);
    return this.listaPublicaciones.length
  }

  getPublicacionesUsuario(){
    this.postService.getPublicacionesByUsuario(this.usuario.id).subscribe((data: Publicacion[]) =>{
      this.listaPublicaciones = data;

    });
  }

  getPerfil(){
    this.perfilService.getProfilebyUserID(this.usuario.id).subscribe((data: Perfil) => {
      this.perfil = data
    });
  }
}
