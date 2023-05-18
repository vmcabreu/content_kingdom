import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Publicacion } from 'src/app/model/publicacion.model';
import { Usuario } from 'src/app/model/usuario.model';
import { JwtService } from 'src/app/service/jwt.service';
import { PostService } from 'src/app/service/post.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit, OnDestroy {
  usuario: Usuario;
  newUsuarios: Usuario[] = [];
  topPublicaciones: Publicacion[] = [];
  listaUsuario: Usuario[] = [];
  suscriptions: Subscription[] = [];

  constructor(
    private userService: UsuarioService,
    private postService: PostService,
    private jwt: JwtService
  ) {}

  ngOnInit(): void {
    this.initializeData();
    this.subscribeToRefreshEvents();
  }

  ngOnDestroy(): void {
    this.suscriptions.forEach(subscription => subscription.unsubscribe());
  }

  initializeData(): void {
    this.getNewUsuarios();
    this.getUsuarios();
    this.getPublicacionesOrderLikes();
    this.getUsuario();
  }

  subscribeToRefreshEvents(): void {
    this.suscriptions.push(
      this.userService.getRefresh$.subscribe(() => {
        this.getNewUsuarios();
        this.getUsuarios();
      }),
      this.postService.getRefresh$.subscribe(() => {
        this.getPublicacionesOrderLikes();
      })
    );
  }

  getPublicacionesOrderLikes(): void {
    this.postService.getPublicacionesOrderMeGusta().subscribe((data: Publicacion[]) => {
      this.topPublicaciones = data;
    });
  }

  getNewUsuarios(): void {
    this.userService.getNewUserList().subscribe((data: Usuario[]) => {
      this.newUsuarios = data;
    });
  }

  getUserName(id: number): string {
    const user = this.listaUsuario.find(element => element.id === id);
    return user ? user.usuario : '';
  }

  getUsuario(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.usuario = this.jwt.decodeUsuario(token);
    }
  }

  getUsuarios(): void {
    this.userService.getUserList().subscribe((data: Usuario[]) => {
      this.listaUsuario = data;
    });
  }
}
