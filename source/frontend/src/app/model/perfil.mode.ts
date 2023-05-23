export class Perfil {
  public id: number;
  public canales: string;
  public profile_pic: File;
  public biografica: string;
  public profesion: string;
  public id_usuario: number;


  constructor(id: number = 0, canales: string = "", profile_pic: File = null, biografica: string = "", profesion: string = "", id_usuario: number = 0,) {
    this.id = id;
    this.canales = canales;
    this.profile_pic = profile_pic;
    this.biografica = biografica;
    this.profesion = profesion;
    this.id_usuario = id_usuario;
  }
}
