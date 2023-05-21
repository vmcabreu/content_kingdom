import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Publicacion } from 'src/app/model/publicacion.model';
import { Usuario } from 'src/app/model/usuario.model';
import { JwtService } from 'src/app/service/jwt.service';
import { PostService } from 'src/app/service/post.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent {
  listaUsuario: Usuario[] = [];
  publicaciones: Publicacion[] = [];

  constructor(private jwt: JwtService,private userService: UsuarioService,private postService:PostService,private router:Router) { }

  ngOnInit(){
    this.getUsuarios();
    this.getPublicaciones();
  }

  getNumberPosts(id:number) {
    let postNumber:Publicacion[] =[]
    this.publicaciones.forEach(element => {
      if(element.id_usuario === id){
        postNumber.push(element);
      }
    });
    return postNumber.length;
  }

  getUsuarios(): void {
    this.userService.getUserList().subscribe(
      (data: Usuario[]) => {
        this.listaUsuario = data;
      }
    );
  }

  getPublicaciones() {
    this.postService.getPublicaciones().subscribe((data: Publicacion[]) => {
      this.publicaciones = data;
    });
  }

}
