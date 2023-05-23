export class Publicacion {
  public id: number;
  public id_usuario: number;
  public id_videojuego: number;
  public fecha: string;
  public megusta: number;
  public mensaje: string;
  public adjunto: string;
  public plataforma: string;
  public isLiked: boolean;
  public img: File;

  constructor(
    id: number = 0,
    id_usuario: number = 0,
    id_videojuego: number = 0,
    fecha: string = "",
    megusta: number = 0,
    mensaje: string = "",
    adjunto: string = "",
    plataforma: string = "",
    img: File = null,
  ) {
    this.id = id;
    this.id_usuario = id_usuario;
    this.id_videojuego = id_videojuego;
    this.fecha = fecha;
    this.megusta = megusta;
    this.mensaje = mensaje;
    this.adjunto = adjunto;
    this.plataforma = plataforma;
    this.img = img;
  }
}
