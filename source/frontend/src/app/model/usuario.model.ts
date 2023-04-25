export class Usuario {
  [x: string]: any;
  public id: number;
  public usuario: string;
  public passwd: string;
  public email: string;

  constructor(id: number, usuario: string, passwd: string, email: string = "") {
    this.id = id;
    this.usuario = usuario;
    this.passwd = passwd;
    this.email = email;
  }
}
