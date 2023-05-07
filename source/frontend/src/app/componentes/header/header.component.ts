import { Component } from '@angular/core';
import { Usuario } from 'src/app/model/usuario.model';
import { JwtService } from 'src/app/service/jwt.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  usuario: Usuario = null;

  constructor(private jwt: JwtService) { }

  ngOnInit() {
    this.getUsuario();
    console.log(this.usuario);

  }


  getUsuario() {
    let token = localStorage.getItem('token')
    if (token != "") {
      this.usuario = this.jwt.decodeUsuario(token);
    }
  }

  logOut(){
    let token = localStorage.setItem('token',"")
    window.location.reload();
  }
}
