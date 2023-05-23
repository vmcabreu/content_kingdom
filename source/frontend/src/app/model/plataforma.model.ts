export class Plataforma {
  id: number;
  nombre: string;
  enlace: string;
  id_usuario: number;

  constructor(nombre: string="", enlace: string="", id_usuario: number=0) {
    this.id = 0; // Se asignará automáticamente al insertar en la base de datos
    this.nombre = nombre;
    this.enlace = enlace;
    this.id_usuario = id_usuario;
  }
}
