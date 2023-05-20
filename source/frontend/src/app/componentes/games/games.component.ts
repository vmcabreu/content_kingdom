import { Component } from '@angular/core';
import { Videojuego } from 'src/app/model/videojuego.model';
import { JwtService } from 'src/app/service/jwt.service';
import { VideojuegoService } from 'src/app/service/videojuego.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent {

  listaVideojuegos: Videojuego[] = [];

  constructor(private jwt:JwtService,private gameService: VideojuegoService){}

  ngOnInit(){
    this.getListaJuegos()
  }

  getListaJuegos(){
    this.gameService.getAllGames().subscribe((data:Videojuego[]) =>{
      this.listaVideojuegos = data;
    })
  }
}
