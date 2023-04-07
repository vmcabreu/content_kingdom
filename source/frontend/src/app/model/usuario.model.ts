export class Usuario {
  public id: number;
  public nombre: string;
  public passwd: string;
  public email: string;

  constructor(id: number, nombre: string, passwd: string, email: string = "") {
    this.id = id;
    this.nombre = nombre;
    this.passwd = passwd;
    this.email = email;
  }
}
