class AmigosUsuarios {
  usuario_id: number;
  amigo_id: number;
  fecha_amistad: Date;

  constructor(usuario_id: number=0, amigo_id: number=0, fecha_amistad: Date=new Date()) {
    this.usuario_id = usuario_id;
    this.amigo_id = amigo_id;
    this.fecha_amistad = fecha_amistad;
  }
}
