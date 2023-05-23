import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Comentario } from 'src/app/model/comentario.model';
import { Etiqueta } from 'src/app/model/etiqueta.model';
import { Publicacion } from 'src/app/model/publicacion.model';
import { Usuario } from 'src/app/model/usuario.model';
import { Videojuego } from 'src/app/model/videojuego.model';
import { JwtService } from 'src/app/service/jwt.service';
import { PostService } from 'src/app/service/post.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { VideojuegoService } from 'src/app/service/videojuego.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-game-posts',
  templateUrl: './game-posts.component.html',
  styleUrls: ['./game-posts.component.css']
})
export class GamePostsComponent {
  usuario:Usuario = this.jwt.checkToken();
  juego: Videojuego = new Videojuego();
  listaPublicaciones: Publicacion[]=[];
  idJuego: number= Number(this.router.url.split("/")[2]);
  listaUsuario: Usuario[] = [];
  commentsNumber: any[] = [];
  postComentarios: Comentario[] = [];
  comentario: Comentario = new Comentario();
  selectedPost: number;
  etiquetas: Etiqueta[] = [];
  plataformas: string[] = ["Twitch", "YouTube", "TikTok", "Instagram"]

  constructor(private jwt: JwtService,private userService: UsuarioService,private postService: PostService, private gameService: VideojuegoService,private router:Router) { }


  ngOnInit(){
    this.getJuego();
    this.getUsuarios();
    this.getPublicacionesByJuego();
    this.getCommentsNumber();
    this.getEtiquetas();
  }

  getPublicacionesByJuego(){
    this.postService.getPublicacionesFromGameId(this.idJuego).subscribe((data: Publicacion[]) =>{
     this.listaPublicaciones = data;
    })
  }

  getJuego(){
    this.gameService.getJuegoById(this.idJuego).subscribe((data: Videojuego)=>{
      this.juego = data;
    })
  }

  getUserName(id: number) {
    const user = this.listaUsuario.find(element => element.id === id);
    return user ? user.usuario : '';
  }

  getUsuarios(): void {
    this.userService.getUserList().subscribe(
      (data: Usuario[]) => {
        this.listaUsuario = data;
      }
    );
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
      Swal.fire({
        title: '¡Has publicado con éxito!',
        icon: 'success',
        timerProgressBar: true,
        background: '#151515',
        color: '#fff'
      }).then(() => {
        this.getCommentsByPostId(this.comentario.id_publicacion);
      });
    });
  }

  deleteComentario(postID: number) {
    this.postService.deleteComentario(postID).subscribe(() => {
      Swal.fire({
        title: '¡Comentario borrado con éxito!',
        icon: 'success',
        timerProgressBar: true,
        background: '#151515',
        color: '#fff'
      }).then(() => {
        window.location.reload();
      });
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
        window.location.reload();
      });
    });
  }
}
