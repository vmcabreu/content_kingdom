import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Perfil } from 'src/app/model/perfil.mode';
import { Publicacion } from 'src/app/model/publicacion.model';
import { Usuario } from 'src/app/model/usuario.model';
import { JwtService } from 'src/app/service/jwt.service';
import { PerfilService } from 'src/app/service/perfil.service';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {

  constructor(private perfilService: PerfilService, private postService: PostService, private jwt: JwtService) { }

  usuario: Usuario;
  listaPublicaciones: Publicacion[] = [];
  perfil: Perfil = new Perfil;
  items: MenuItem[];

  activeItem: MenuItem;

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
}
