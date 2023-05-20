import { Component } from '@angular/core';
import { Videojuego } from 'src/app/model/videojuego.model';
import { JwtService } from 'src/app/service/jwt.service';
import { VideojuegoService } from 'src/app/service/videojuego.service';
import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent {

  listaVideojuegos: Videojuego[] = [];
  videojuegosFiltrados: Videojuego[] = [];
  consolas = [
    { label: 'PS4', icon: 'assets/imgs/console/PS.png' },
    { label: 'Nintendo 64', icon: 'assets/imgs/console/N64.png' },
    { label: 'PC', icon: 'assets/imgs/console/PC.png' },
    { label: 'Nintendo DS', icon: 'assets/imgs/console/DS.png' },
    { label: 'Xbox', icon: 'assets/imgs/console/XBOX.png' },
    { label: 'Switch', icon: 'assets/imgs/console/Switch.png' }
  ];
  selectedConsola: any = "";
  filteredConsolas: any;
  suggestionsJuegos: any[] = [];
  suggestionsConsolas: any[] = [];
  selectedItem: any = "";
  suggestions: any[];
  filterApplied: boolean = false;

  @ViewChild('selectJuegos') selectJuegos!: ElementRef;
  @ViewChild('selectConsolas') selectConsolas!: ElementRef;

  constructor(private jwt: JwtService, private gameService: VideojuegoService,private router:Router) { }

  ngOnInit() {
    this.getListaJuegos();
  }

  search(event) {
    this.suggestions = this.listaVideojuegos.map(item => item.nombre);
  }

  getListaJuegos() {
    this.gameService.getAllGames().subscribe((data: Videojuego[]) => {
      this.listaVideojuegos = data;
      if (!this.filterApplied) {
        this.videojuegosFiltrados = data;
      }
    });
  }

  checkIfFilterOn() {
    return this.selectedConsola !== "" || this.selectedItem !== "";
  }


  selectSuggestion(property: string, suggestion: any) {
    this[property] = suggestion.nombre || suggestion.label;
    this.suggestionsJuegos = [];
    this.suggestionsConsolas = [];
  }

  filterGame(event: any) {
    const value = event.target.value.toLowerCase();

    this.selectedItem = value; // Actualizar el juego seleccionado

    this.applyFilter(); // Aplicar el filtrado

    this.filterApplied = true; // Marcamos que se aplicó un filtro
  }

  filterConsole() {
    this.applyFilter(); // Aplicar el filtrado

    this.filterApplied = true; // Marcamos que se aplicó un filtro
  }

  applyFilter() {
    this.videojuegosFiltrados = this.listaVideojuegos.filter(juego => {
      const nombreEncontrado = juego.nombre.toLowerCase().includes(this.selectedItem.toLowerCase());
      const consolaEncontrada = juego.plataforma.toLowerCase() === this.selectedConsola.toLowerCase();

      if (this.selectedItem && this.selectedConsola) {
        // Filtrar por nombre del juego y consola
        return nombreEncontrado && consolaEncontrada;
      } else if (this.selectedItem) {
        // Filtrar solo por nombre del juego
        return nombreEncontrado;
      } else if (this.selectedConsola) {
        // Filtrar solo por consola
        return consolaEncontrada;
      }

      return true; // No se aplicó ningún filtro
    });
  }


  iconPlataforma(plataforma) {
    const consola = this.consolas.find(c => c.label.toLowerCase() === plataforma.toLowerCase());
    return consola ? consola.icon : '';
  }

  navigateToGame(id:number){
    this.router.navigateByUrl("games/"+id);
  }
}
