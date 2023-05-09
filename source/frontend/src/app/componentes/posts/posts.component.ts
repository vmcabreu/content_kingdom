import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Publicacion } from 'src/app/model/publicacion.model';
import { Videojuego } from 'src/app/model/videojuego.model';
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

  constructor(private postService: PostService, private videojuegoService: VideojuegoService) { }

  ngOnInit() {
    this.getJuegos
    this.suscription = this.postService.getRefresh$.subscribe()
  }

  addPublicacion() {

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
