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
import { EtiquetaPublicacionService } from 'src/app/service/etiqueta-publicacion.service';
import { EtiquetasPublicacion } from 'src/app/model/etiqueta-publicacion.model';

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
  listaGustados: Publicacion[]=[];
  juegoSelected: Videojuego = new Videojuego();
  suscription: Subscription;
  usuario: Usuario = this.jwt.checkToken();
  commentsNumber: any[] = [];
  listaUsuario: Usuario[] = [];
  postComentarios: Comentario[] = [];
  comentario: Comentario = new Comentario();
  selectedPost: number;
  etiquetas: Etiqueta[] = [];
  plataformas: string[] = ["Twitch", "YouTube", "TikTok", "Instagram"];
  listaLikes: Like[] = [];
  likesMap: { [postId: number]: boolean } = {};
  tagsMap: EtiquetasPublicacion[] = [];
  newEtiqueta: Etiqueta;
  tagsSelected: Etiqueta[] = [];
  newListEtiquetas: EtiquetasPublicacion[] = [];



  constructor(
    private postService: PostService,
    private videojuegoService: VideojuegoService,
    private jwt: JwtService,
    private userService: UsuarioService,
    private likeService: LikesService,
    private tagService: EtiquetaPublicacionService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initializeData();
  }

  initializeData() {
    this.getJuegos();
    this.getUsuarios();
    this.getPublicaciones();
    this.getPublicacionesOrderLikes();
    this.getCommentsNumber();
    this.getEtiquetas();
    this.getEtiquetasFromPost();
  }

  getLikes() {
    this.likeService.getLikesList().subscribe((data: Like[]) => {
      this.listaLikes = data;
      this.likesMap = {};
      for (const like of data) {
        if (like.id_usuario == this.usuario.id) {
          this.likesMap[like.id_publicacion] = true;
        }else{
          this.likesMap[like.id_publicacion] = false;
        }
      }
    });
  }

  getEtiquetasFromPost() {
    this.tagService.getListTagPost().subscribe(
      (data: EtiquetasPublicacion[]) => { this.tagsMap = data }
    )
  }

  getJuegoFromPost(id: number) {
    return this.listaVideojuegos.find(element => element.id === id).nombre
  }

  checkIfIsLike(postId: number) {
    return this.likesMap[postId] || false;
  }

  getPostGustados(){
    this.postService.getPublicacionesMeGustaPorUsuario(this.usuario.id).subscribe((data: Publicacion[]) =>{
      this.listaGustados=data;
      for (const item of this.publicaciones) {
        if (data.find((i) => i.id === item.id)) {
          this.likesMap[item.id] = true;
        }else{
          this.likesMap[item.id] = false;
        }
      }
    })
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
          this.getLikes();
    });
  }

  getPublicacionesOrderLikes() {
    this.postService.getPublicacionesOrderMeGusta().subscribe((data: Publicacion[]) => {
      this.topPublicaciones = data;
    });
  }


  deletePost(postID: number) {
    this.postService.deletePublicacion(postID).subscribe(() => {
      Swal.fire({
        title: '¡Publicacion borrada con éxito!',
        icon: 'success',
        timerProgressBar: true,
        background: '#151515',
        color: '#fff'
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
        background: '#151515',
        color: '#fff'
      }).then(() => {
        this.refreshData();
        this.addEtiquetasForPost();
      });
    });
  }

  addTagToList(etiqueta: Etiqueta) {
    if (!this.tagsSelected.find(element => element.id === etiqueta.id)) {
      this.newListEtiquetas.push(new EtiquetasPublicacion(etiqueta.id))
      this.tagsSelected.push(etiqueta);
    }
  }

  addEtiquetasForPost() {
    this.postService.getPublicaciones().subscribe((data: Publicacion[]) => {
      let id = data[0].id
      this.newListEtiquetas.forEach(element => {
        element.id_publicacion = id
      });
      this.tagService.addTagPostList(this.newListEtiquetas).subscribe()
    })
  }

  getTagFormPost(id:number) {
    let tagList: string[] =[]
    this.tagsMap.forEach(element => {
      if (element.id_publicacion == id) {
      tagList.push(this.etiquetas.find(tags => tags.id === element.id_etiqueta).nombre);
      }
    });
    return tagList;
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
        background: '#151515',
        color: '#fff'
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
        background: '#151515',
        color: '#fff'
      }).then(() => {
        this.refreshDataAndComments();
        window.location.reload();
      });
    });
  }
}
