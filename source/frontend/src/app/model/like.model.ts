export class Like {
  id_publicacion: number;
  id_usuario: number;

  constructor(
    id_publicacion: number = 0,
    id_usuario: number = 0,
  ) {
    this.id_publicacion = id_publicacion;
    this.id_usuario = id_usuario;
  }
}
