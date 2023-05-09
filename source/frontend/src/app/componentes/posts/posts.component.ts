import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Publicacion } from 'src/app/model/publicacion.model';
import { Usuario } from 'src/app/model/usuario.model';
import { Videojuego } from 'src/app/model/videojuego.model';
import { JwtService } from 'src/app/service/jwt.service';
import { PostService } from 'src/app/service/post.service';
import { VideojuegoService } from 'src/app/service/videojuego.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {
  isClicked = false;
  newPublicacion: Publicacion = new Publicacion();
  publicaciones: Publicacion[] = [];
  listaVideojuegos: Videojuego[] = [];
  juegoSelected: Videojuego = new Videojuego();
  suscription: Subscription;
  usuario: Usuario;

  constructor(private postService: PostService, private videojuegoService: VideojuegoService, private jwt: JwtService) { }

  ngOnInit() {
    this.getJuegos();
    this.getUsuario();
    this.suscription = this.videojuegoService.getRefresh$.subscribe(() => {
      this.getJuegos();
    })
    this.suscription = this.jwt.getRefresh$.subscribe(() => {
      this.getUsuario();
    })
    this.suscription = this.postService.getRefresh$.subscribe(() => {
      this.getUsuario();
    })
  }

  getPublicaciones() {
    this.postService.getPublicaciones().subscribe((data: Publicacion[]) => {
      this.publicaciones = data;
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
    this.newPublicacion.fecha = this.formatFecha();
    this.newPublicacion.id_videojuego = Number(this.newPublicacion.id_videojuego);
    console.log(this.newPublicacion);
    console.log(this.usuario);
    this.postService.addPublicacion(this.newPublicacion).subscribe(()=>{
      Swal.fire({
        title: '¡Registro correcto!',
        icon: 'success',
        timerProgressBar: true,
      }).then((result) => {
        this.ngOnInit();
      })
    });
  }

  formatFecha() {
    const fechaActual = new Date();
    return fechaActual.toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' });;
  }

  selectJuego(id: number) {
    this.listaVideojuegos.forEach(element => {
      if (element.id == id) {
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
