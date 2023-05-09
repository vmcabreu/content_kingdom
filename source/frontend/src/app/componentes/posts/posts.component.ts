import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Publicacion } from 'src/app/model/publicacion.model';
import { Usuario } from 'src/app/model/usuario.model';
import { Videojuego } from 'src/app/model/videojuego.model';
import { JwtService } from 'src/app/service/jwt.service';
import { PostService } from 'src/app/service/post.service';
import { VideojuegoService } from 'src/app/service/videojuego.service';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {
  isClicked = false;
  newPublicacion: Publicacion = new Publicacion();
  listaVideojuegos: Videojuego[] = [];
  juegoSelected: Videojuego = new Videojuego();
  suscription: Subscription;
  usuario: Usuario;

  constructor(private postService: PostService, private videojuegoService: VideojuegoService, private jwt: JwtService) { }

  ngOnInit() {
    this.getJuegos();
    this.getUsuario();
    this.suscription = this.videojuegoService.getRefresh$.subscribe(() =>{
      this.getJuegos();
      this.getUsuario();
    })
  }

  getUsuario() {
    let token = localStorage.getItem('token')
    if (token !== "" && token !== undefined) {
      this.usuario = this.jwt.decodeUsuario(token);
    }
  }

  addPublicacion() {
    this.newPublicacion.id_usuario = this.usuario.id;
    this.newPublicacion.fecha= new Date();
    this.newPublicacion.id_videojuego = this.juegoSelected.id;
    this.postService.addPublicacion(this.newPublicacion).subscribe();
  }

  selectJuego(id:number){
    this.listaVideojuegos.forEach(element => {
      if (element.id==id) {
        this.juegoSelected = element;
      }
    });
  }

  getJuegos() {
    this.videojuegoService.getAllGames().subscribe((data: Videojuego[]) => {
      this.listaVideojuegos = data;
    })
  }
  toggleLike() {
    this.isClicked = !this.isClicked;
  }
}
