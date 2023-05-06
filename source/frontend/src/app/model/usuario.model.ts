export class Usuario {
  public id: number;
  public usuario: string;
  public email: string;

  constructor(id: number, usuario: string,  email: string = "") {
    this.id = id;
    this.usuario = usuario;
    this.email = email;
  }
}
