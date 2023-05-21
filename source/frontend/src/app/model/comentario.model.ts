export class Comentario {
  id:number;
  id_usuario: number;
  id_publicacion: number;
  comentario: string;
  constructor(id:number=0,id_usuario: number = 0, id_publicacion: number = 0, comentario: string = "") {
    this.id=id;
    this.id_usuario = id_usuario;
    this.id_publicacion = id_publicacion;
    this.comentario = comentario;
  }
}
