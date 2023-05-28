import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { post } from 'jquery';
import { MenuItem } from 'primeng/api';
import { AmigosUsuarios } from 'src/app/model/amigos.model';
import { Comentario } from 'src/app/model/comentario.model';
import { EtiquetasPublicacion } from 'src/app/model/etiqueta-publicacion.model';
import { Etiqueta } from 'src/app/model/etiqueta.model';
import { Perfil } from 'src/app/model/perfil.mode';
import { Plataforma } from 'src/app/model/plataforma.model';
import { Publicacion } from 'src/app/model/publicacion.model';
import { Usuario } from 'src/app/model/usuario.model';
import { Videojuego } from 'src/app/model/videojuego.model';
import { AmigosService } from 'src/app/service/amigos.service';
import { EtiquetaPublicacionService } from 'src/app/service/etiqueta-publicacion.service';
import { JwtService } from 'src/app/service/jwt.service';
import { PerfilService } from 'src/app/service/perfil.service';
import { PlataformaService } from 'src/app/service/plataforma.service';
import { PostService } from 'src/app/service/post.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { VideojuegoService } from 'src/app/service/videojuego.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {

  constructor(private perfilService: PerfilService, private postService: PostService, private jwt: JwtService, private userService: UsuarioService, private plataformasService: PlataformaService, private friendService: AmigosService, private videojuegoService: VideojuegoService,private tagService: EtiquetaPublicacionService, private router: Router) { }

  usuario: Usuario;
  ruta: string[] = this.router.url.split("/")
  listaPublicaciones: Publicacion[] = [];
  listaGustados: Publicacion[] = [];
  listaVideojuegos: Videojuego[] = [];
  biografia: string = "";
  perfil: Perfil = new Perfil;
  editarPerfil: boolean = false;
  items: MenuItem[];
  comentario: Comentario = new Comentario;
  etiquetas: Etiqueta[] = [];
  activeItem: String;
  commentsNumber: any[] = [];
  selectedPost: number;
  postComentarios: Comentario[] = [];
  listaUsuario: Usuario[] = [];
  listaAmigos: AmigosUsuarios[] = [];
  listaPlataforma: Plataforma[] = [];
  tagsMap: EtiquetasPublicacion[] = [];
  newPlataforma: Plataforma = new Plataforma();
  plataformas: string[] = ["Twitch", "YouTube", "TikTok", "Instagram"];
  imgPlataformas: string[] = ["https://cdn-icons-png.flaticon.com/512/5968/5968819.png", "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/1024px-YouTube_full-color_icon_%282017%29.svg.png", "https://cdn4.iconfinder.com/data/icons/social-media-flat-7/64/Social-media_Tiktok-512.png", "https://cdn-icons-png.flaticon.com/512/174/174855.png"]


  ngOnInit() {
    this.usuario = this.jwt.checkToken();
    //   { label: 'Biografia', icon: 'pi pi-fw pi-user' },
    this.items = [
      { label: 'Publicaciones', icon: 'pi pi-fw pi-comment' },
      { label: 'Gustados', icon: 'pi pi-fw pi-heart' },
      { label: 'Canales', icon: 'pi pi-fw pi-desktop' },
      { label: 'Amigos', icon: 'pi pi-fw pi-users' }
    ];
    this.activeItem = this.items[0].label;
    this.getPublicacionesUsuario();
    this.getPerfil();
    this.getPlataformaByUsuarioId();
    this.getListaAmigos();
    this.getPostGustados();
    this.getJuegos();
    this.getEtiquetas();
    this.getEtiquetasFromPost();
  }

  onActiveItemChange(event) {
    this.activeItem = event;
  }


  activateLast() {
    this.activeItem = this.items[this.items.length - 1].label;
  }



  getJuegos() {
    this.videojuegoService.getAllGames().subscribe((data: Videojuego[]) => {
      this.listaVideojuegos = data;
    });
  }

  updateBiografia() {
    this.perfilService.updatePerfil(this.perfil).subscribe(response => {
      if (response.status === 200) {
        Swal.fire({
          title: '¡Actualizado con éxito!',
          icon: 'success',
          timerProgressBar: true,
          background: '#151515',
          color: '#fff'
        }).then(() => {
          this.editarPerfil = false;
          this.getPerfil();
        });
      }
    })
  }

  getEtiquetasFromPost() {
    this.tagService.getListTagPost().subscribe(
      (data: EtiquetasPublicacion[]) => { this.tagsMap = data }
    )
  }

  getTagFormPost(id: number) {
    let tagList: string[] = []
    this.tagsMap.forEach(element => {
      if (element.id_publicacion == id) {
        tagList.push(this.etiquetas.find(tags => tags.id === element.id_etiqueta).nombre);
      }
    });
    return tagList;
  }

  getJuegoFromPost(id: number) {
    let videojuego = this.listaVideojuegos.find(element => element.id === id);
    return videojuego.nombre
  }

  getPlataformaByUsuarioId() {
    this.plataformasService.getPlataformaFromUsuarios(this.usuario.id).subscribe((data: Plataforma[]) => {
      this.listaPlataforma = data;
    })
  }

  addCanal() {
    this.newPlataforma.id_usuario = this.usuario.id;
    this.plataformasService.addPlataforma(this.newPlataforma).subscribe(response => {
      if (response.status === 200) {
        this.getPlataformaByUsuarioId();
        Swal.fire({
          title: '¡Canal añadido con éxito!',
          icon: 'success',
          timerProgressBar: true,
          background: '#151515',
          color: '#fff'
        }).then(() => {
          this.getPlataformaByUsuarioId();
        });
      }
    });
  }

  getImage(plataforma: string) {
    let img: string;
    for (let index = 0; index < this.plataformas.length; index++) {
      if (this.plataformas[index] == plataforma) {
        img = this.imgPlataformas[index]
      }
    }
    return img;
  }

  getNumberPosts() {
    return this.listaPublicaciones.length
  }

  getPostGustados() {
    this.postService.getPublicacionesMeGustaPorUsuario(this.usuario.id).subscribe((data: Publicacion[]) => {
      this.listaGustados = data;
    })
  }

  getListaAmigos() {
    this.friendService.getAmigosFromUsuario(this.usuario.id).subscribe((data: AmigosUsuarios[]) => {
      this.listaAmigos = data;
    })
  };

  getAmigoFromLista() {
    let lista: Usuario[] = []
    this.listaAmigos.forEach(element => {
      if (element.usuario_id == this.usuario.id) {
        lista.push(this.listaUsuario.find(usuario => usuario.id == element.amigo_id))
      }
    });
    return lista;
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
        background: '#151515',
        color: '#fff'
      }).then(() => {
        this.getCommentsByPostId(this.comentario.id_publicacion);
      });
    });
  }

  deleteComentario(postID: number) {
    this.postService.deleteComentario(postID).subscribe(response => {
      if (response.status === 200) {
        Swal.fire({
          title: '¡Comentario borrado con éxito!',
          icon: 'success',
          timerProgressBar: true,
          background: '#151515',
          color: '#fff'
        }).then(() => {
          this.getCommentsByPostId(postID);
        });
      }

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
