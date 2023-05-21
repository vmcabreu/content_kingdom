import { Component, OnInit } from '@angular/core';
import { NumberValueAccessor } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Comentario } from 'src/app/model/comentario.model';
import { Etiqueta } from 'src/app/model/etiqueta.model';
import { Publicacion } from 'src/app/model/publicacion.model';
import { Usuario } from 'src/app/model/usuario.model';
import { Videojuego } from 'src/app/model/videojuego.model';
import { JwtService } from 'src/app/service/jwt.service';
import { LikesService } from 'src/app/service/likes.service';
import { PostService } from 'src/app/service/post.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { VideojuegoService } from 'src/app/service/videojuego.service';
import Swal from 'sweetalert2';
import { Like } from 'src/app/model/like.model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  isClicked = false;
  newPublicacion: Publicacion = new Publicacion();
  publicaciones: Publicacion[] = [];
  topPublicaciones: Publicacion[] = [];
  listaVideojuegos: Videojuego[] = [];
  juegoSelected: Videojuego = new Videojuego();
  suscription: Subscription;
  usuario: Usuario;
  commentsNumber: any[] = [];
  listaUsuario: Usuario[] = [];
  postComentarios: Comentario[] = [];
  comentario: Comentario = new Comentario();
  selectedPost: number;
  etiquetas: Etiqueta[] = [];
  plataformas: string[] = ["Twitch", "YouTube", "TikTok", "Instagram"];
  listaLikes: Like[] = [];
  likesMap: {
    [postId: number]: boolean
  } = {};



  constructor(
    private postService: PostService,
    private videojuegoService: VideojuegoService,
    private jwt: JwtService,
    private userService: UsuarioService,
    private likeService: LikesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initializeData();
  }

  initializeData() {
    this.getJuegos();
    this.getUsuario();
    this.getUsuarios();
    this.getPublicaciones();
    this.getPublicacionesOrderLikes();
    this.getCommentsNumber();
    this.getEtiquetas();
    this.getLikes();
  }

  getLikes() {
    this.likeService.getLikesList().subscribe((data: Like[]) => {
      this.listaLikes = data;
      this.likesMap = {};
      for (const like of data) {
        this.likesMap[like.id_publicacion] = true;
      }
    });
  }

checkIfIsLike(postId: number) {
  return this.likesMap[postId] || false;
}

setLike(id: number) {
  let post = this.publicaciones.find(element => element.id === id);
  if (!this.checkIfIsLike(id)) {
    post.megusta++;
    this.likesMap[id] = true;
    this.likeService.setLikes(this.usuario.id, id).subscribe();
  }
}

unLike(id: number) {
  let post = this.publicaciones.find(element => element.id === id);
  if (this.checkIfIsLike(id)) {
    post.megusta--;
    this.likesMap[id] = false;
    this.likeService.unLike(this.usuario.id, id).subscribe();
  }
}

toggleLike(id: number) {
  if (this.checkIfIsLike(id)) {
    this.unLike(id);
  } else {
    this.setLike(id);
  }
}


  getPublicaciones() {
    this.postService.getPublicaciones().subscribe((data: Publicacion[]) => {
      this.publicaciones = data;
    });
  }

  getPublicacionesOrderLikes() {
    this.postService.getPublicacionesOrderMeGusta().subscribe((data: Publicacion[]) => {
      this.topPublicaciones = data;
    });
  }

  getUsuario() {
    const token = localStorage.getItem('token');
    if (token) {
      this.usuario = this.jwt.decodeUsuario(token);
    }
  }

  deletePost(postID: number) {
    this.postService.deletePublicacion(postID).subscribe(() => {
      Swal.fire({
        title: '¡Publicacion borrada con éxito!',
        icon: 'success',
        timerProgressBar: true,
      }).then(() => {
        this.refreshData();
        window.location.reload();
      });
    });
  }

  addPublicacion() {
    this.newPublicacion.id_usuario = this.usuario.id;
    this.newPublicacion.fecha = this.formatFecha();
    this.newPublicacion.id_videojuego = Number(this.newPublicacion.id_videojuego);
    this.postService.addPublicacion(this.newPublicacion).subscribe(() => {
      this.refreshData();
      Swal.fire({
        title: '¡Has publicado con éxito!',
        icon: 'success',
        timerProgressBar: true,
      }).then(() => {
        this.refreshData();
      });
    });
  }

  refreshDataAndComments() {
    this.refreshData();
    this.getCommentsByPostId(this.selectedPost);
  }

  refreshData() {
    this.getPublicaciones();
    this.getPublicacionesOrderLikes();
    this.getCommentsNumber();
  }

  getUsuarios(): void {
    this.userService.getUserList().subscribe(
      (data: Usuario[]) => {
        this.listaUsuario = data;
      }
    );
  }

  getUserName(id: number) {
    const user = this.listaUsuario.find(element => element.id === id);
    return user ? user.usuario : '';
  }

  formatFecha() {
    const fechaActual = new Date();
    const year = fechaActual.getFullYear();
    const month = ('0' + (fechaActual.getMonth() + 1)).slice(-2);
    const day = ('0' + fechaActual.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  selectJuego(id: number) {
    this.juegoSelected = this.listaVideojuegos.find(element => element.id === id);
  }

  getJuegos() {
    this.videojuegoService.getAllGames().subscribe((data: Videojuego[]) => {
      this.listaVideojuegos = data;
    });
  }

  getEtiquetas() {
    this.postService.getEtiquetas().subscribe((data: Etiqueta[]) => {
      this.etiquetas = data;
    })
  }

  getCommentsNumber() {
    this.postService.getNumComentarios().subscribe((data: any[]) => {
      this.commentsNumber = data;
    });
  }

  getCommentsByPostId(id: number) {
    this.selectedPost = id;
    this.comentario.id_publicacion = id;
    this.comentario.id_usuario = this.usuario.id;
    this.postService.getComentariosFromPostId(id).subscribe((data: Comentario[]) => {
      this.postComentarios = data;
    });
  }

  getNumberOfPosts(idPost: number) {
    const comentario = this.commentsNumber.find(element => element.id_publicacion === idPost);
    return comentario ? comentario.numero_publicaciones : 0;
  }

  addComentario() {
    this.postService.addComentario(this.comentario).subscribe(() => {
      this.refreshDataAndComments();
      Swal.fire({
        title: '¡Has publicado con éxito!',
        icon: 'success',
        timerProgressBar: true,
      }).then(() => {
        this.refreshDataAndComments();
        this.getCommentsByPostId(this.comentario.id_publicacion);
      });
    });
  }

  deleteComentario(postID: number) {
    this.postService.deleteComentario(postID).subscribe(() => {
      this.refreshDataAndComments();
      Swal.fire({
        title: '¡Comentario borrado con éxito!',
        icon: 'success',
        timerProgressBar: true,
      }).then(() => {
        this.refreshDataAndComments();
        window.location.reload();
      });
    });
  }
}
