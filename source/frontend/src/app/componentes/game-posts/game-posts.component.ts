import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Publicacion } from 'src/app/model/publicacion.model';
import { Usuario } from 'src/app/model/usuario.model';
import { Videojuego } from 'src/app/model/videojuego.model';
import { JwtService } from 'src/app/service/jwt.service';
import { PostService } from 'src/app/service/post.service';
import { VideojuegoService } from 'src/app/service/videojuego.service';

@Component({
  selector: 'app-game-posts',
  templateUrl: './game-posts.component.html',
  styleUrls: ['./game-posts.component.css']
})
export class GamePostsComponent {
  usuario:Usuario = this.jwt.checkToken();
  juego: Videojuego;
  listaPublicaciones: Publicacion[]=[];
  idJuego: number= Number(this.router.url.split("/")[2]);

  constructor(private jwt: JwtService,private postService: PostService, private gameService: VideojuegoService,private router:Router) { }


  ngOnInit(){
    this.getJuego();
    this.getPublicacionesByJuego();
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
}
