import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Publicacion } from 'src/app/model/publicacion.model';
import { Usuario } from 'src/app/model/usuario.model';
import { Videojuego } from 'src/app/model/videojuego.model';
import { JwtService } from 'src/app/service/jwt.service';
import { PostService } from 'src/app/service/post.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { VideojuegoService } from 'src/app/service/videojuego.service';
import Swal from 'sweetalert2';

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
  listaUsuario: Usuario[] = [];

  constructor(
    private postService: PostService,
    private videojuegoService: VideojuegoService,
    private jwt: JwtService,
    private userService: UsuarioService
  ) {}

  ngOnInit() {
    this.initializeData();
  }

  initializeData() {
    this.getJuegos();
    this.getUsuario();
    this.getUsuarios();
    this.getPublicaciones();
    this.getPublicacionesOrderLikes();
  }

  getPublicaciones() {
    this.postService.getPublicaciones().subscribe((data: Publicacion[]) => {
      this.publicaciones = data;
    });
  }

  getPublicacionesOrderLikes() {
    this.postService.getPublicacionesOrderMeGusta().subscribe((data: Publicacion[]) => {
      console.log(JSON.stringify(data, null, 0));

    });
  }

  getUsuario() {
    const token = localStorage.getItem('token');
    if (token) {
      this.usuario = this.jwt.decodeUsuario(token);
    }
  }

  addPublicacion() {
    this.newPublicacion.id_usuario = this.usuario.id;
    this.newPublicacion.fecha = this.formatFecha();
    this.newPublicacion.id_videojuego = Number(this.newPublicacion.id_videojuego);
    console.log(this.newPublicacion);
    console.log(this.usuario);
    this.postService.addPublicacion(this.newPublicacion).subscribe(() => {
      this.refreshPublicaciones();
      Swal.fire({
        title: '¡Registro correcto!',
        icon: 'success',
        timerProgressBar: true,
      }).then(() => {
        this.refreshPublicaciones();
      });
    });
  }

  refreshPublicaciones() {
    this.getPublicaciones();
    this.getPublicacionesOrderLikes();
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

  toggleLike() {
    this.isClicked = !this.isClicked;
  }
}
