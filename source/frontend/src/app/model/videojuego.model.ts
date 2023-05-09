export class Videojuego {
  public id: number;
  public nombre: string;
  public genero: string;
  public fecha_lanzamiento: Date;
  public plataforma: string;
  public desarrolladores: string;


  constructor(id: number = 0,
    nombre: string = "",
    genero: string = "",
    fecha_lanzamiento: Date = null,
    plataforma: string = "",
    desarrolladores: string = "",
  ) {
    this.id = id;
    this.nombre = nombre;
    this.genero = genero;
    this.fecha_lanzamiento = fecha_lanzamiento;
    this.plataforma = plataforma;
    this.desarrolladores = desarrolladores;
  }
}
