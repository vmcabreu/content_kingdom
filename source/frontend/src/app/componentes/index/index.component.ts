import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Publicacion } from 'src/app/model/publicacion.model';
import { Usuario } from 'src/app/model/usuario.model';
import { PostService } from 'src/app/service/post.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  usuario: Usuario;
  constructor(private userService: UsuarioService, private postService: PostService) { }

  newUsuarios: Usuario[] = [];
  topPublicaciones: Publicacion[] = [];
  listaUsuario: Usuario[] = []

  suscription: Subscription;

  ngOnInit(): void {
    this.getNewUsuarios();
    this.getUsuarios();
    this.getPublicacionesOrderLikes();
    this.suscription = this.userService.getRefresh$.subscribe(() => {
      this.getNewUsuarios();
      this.getUsuarios();
    })
    this.suscription = this.postService.getRefresh$.subscribe(() => {
      this.getPublicacionesOrderLikes();
    })
  }
  getPublicacionesOrderLikes() {
    this.postService.getPublicacionesOrderMeGusta().subscribe((data: Publicacion[]) => {
      this.topPublicaciones = data;
    })
  }

  getNewUsuarios(): void {
    this.userService.getNewUserList().subscribe(
      (data: Usuario[]) => {
        this.newUsuarios = data;
      }
    );
  }

  getUserName(id:number){
    let username: string = "";
    this.listaUsuario.forEach(element => {
      if (element.id == id) {
        username = element.usuario
      }
    });
    return username
  }
  getUsuarios(): void {
    this.userService.getUserList().subscribe(
      (data: Usuario[]) => {
        this.newUsuarios = data;
      }
    );
  }
}
