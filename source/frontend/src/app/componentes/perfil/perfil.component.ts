import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Comentario } from 'src/app/model/comentario.model';
import { Etiqueta } from 'src/app/model/etiqueta.model';
import { Perfil } from 'src/app/model/perfil.mode';
import { Publicacion } from 'src/app/model/publicacion.model';
import { Usuario } from 'src/app/model/usuario.model';
import { JwtService } from 'src/app/service/jwt.service';
import { PerfilService } from 'src/app/service/perfil.service';
import { PostService } from 'src/app/service/post.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {

  constructor(private perfilService: PerfilService, private postService: PostService, private jwt: JwtService, private userService: UsuarioService) { }

  usuario: Usuario;
  listaPublicaciones: Publicacion[] = [];
  perfil: Perfil = new Perfil;
  items: MenuItem[];
  comentario: Comentario = new Comentario;
  etiquetas: Etiqueta[] = [];
  activeItem: MenuItem;
  commentsNumber: any[] = [];
  selectedPost: number;
  postComentarios: Comentario[] = [];
  listaUsuario: Usuario[] = [];

  ngOnInit() {
    this.usuario = this.jwt.checkToken();
    this.items = [
      { label: 'Biografia', icon: 'pi pi-fw pi-user' },
      { label: 'Publicaciones', icon: 'pi pi-fw pi-comment' },
      { label: 'Gustados', icon: 'pi pi-fw pi-heart' },
      { label: 'Canales', icon: 'pi pi-fw pi-desktop' },
      { label: 'Amigos', icon: 'pi pi-fw pi-users' }
    ];

    this.activeItem = this.items[0];
    this.getPublicacionesUsuario();
    this.getPerfil();
  }

  onActiveItemChange(event) {
    this.activeItem = event;
  }

  activateLast() {
    this.activeItem = this.items[this.items.length - 1];
  }

  getNumberPosts() {
    return this.listaPublicaciones.length
  }

  getPublicacionesUsuario() {
    this.postService.getPublicacionesByUsuario(this.usuario.id).subscribe((data: Publicacion[]) => {
      this.listaPublicaciones = data;

    });
  }

  getPerfil() {
    this.perfilService.getProfilebyUserID(this.usuario.id).subscribe((data: Perfil) => {
      this.perfil = data
    });
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
      }).then(() => {
        window.location.reload();
      });
    });
  }
}
