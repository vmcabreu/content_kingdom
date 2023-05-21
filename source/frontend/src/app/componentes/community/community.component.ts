import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AmigosUsuarios } from 'src/app/model/amigos.model';
import { Publicacion } from 'src/app/model/publicacion.model';
import { Usuario } from 'src/app/model/usuario.model';
import { AmigosService } from 'src/app/service/amigos.service';
import { JwtService } from 'src/app/service/jwt.service';
import { PostService } from 'src/app/service/post.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent {
  usuario: Usuario;
  listaUsuario: Usuario[] = [];
  listaAmigos: AmigosUsuarios [] =[];
  publicaciones: Publicacion[] = [];
  userMap: { [postId: number]: boolean } = {};

  constructor(private jwt: JwtService, private userService: UsuarioService, private postService: PostService, private friendService: AmigosService, private router: Router) { }

  ngOnInit() {
    this.usuario = this.jwt.checkToken()
    this.getUsuarios();
    this.getPublicaciones();
  }

  getNumberPosts(id: number) {
    let postNumber: Publicacion[] = []
    this.publicaciones.forEach(element => {
      if (element.id_usuario === id) {
        postNumber.push(element);
      }
    });
    return postNumber.length;
  }

  getUsuarios(): void {
    this.userService.getUserList().subscribe(
      (data: Usuario[]) => {
        this.listaUsuario = data;
        this.userMap = {};
        for (const like of data) {
          this.userMap[like.id] = false;
        }
      }
    );
  }

  getListaAmigos() {
    this.friendService.getAmigosFromUsuario(this.usuario.id).subscribe((data: AmigosUsuarios[]) => {
      this.listaAmigos = data;
      for (const friend of data) {
        if (friend.usuario_id == this.usuario.id) {
          this.userMap[friend.amigo_id] = true;
        }
      }
      this.updateFriendMap();
    });
  }

  updateFriendMap() {
    for (const amigo of this.listaUsuario) {
      const amigoId = amigo.id;
      const isFriend = this.listaAmigos.some(friend => friend.amigo_id === amigoId);
      this.userMap[amigoId] = isFriend;
    }
  }

  getPublicaciones() {
    this.postService.getPublicaciones().subscribe((data: Publicacion[]) => {
      this.publicaciones = data;
    });
  }

  checkIfIsAdded(id: number) {
    return this.userMap[id] || false;
  }

  addFriend(id: number) {
    let amigo = this.listaUsuario.find(element => element.id === id);
    if (!this.checkIfIsAdded(id)) {
      this.userMap[id] = true;
      let amigoUsuario: AmigosUsuarios = new AmigosUsuarios(this.usuario.id, id)
      this.friendService.addAmigo(amigoUsuario).subscribe();
    }
  }

  removeFriend(id: number) {
    let amigo = this.listaUsuario.find(element => element.id === id);
    if (this.checkIfIsAdded(id)) {
      this.userMap[id] = false;
      this.friendService.deleteAmigo(this.usuario.id, id).subscribe();
    }
  }



  toggleLike(id: number) {
    if (this.checkIfIsAdded(id)) {
      this.removeFriend(id);
    } else {
      this.addFriend(id);
    }
  }
}
