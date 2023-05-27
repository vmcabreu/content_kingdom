import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TooltipOptions } from 'primeng/tooltip';
import { Subscription } from 'rxjs';
import { Perfil } from 'src/app/model/perfil.mode';
import { Usuario } from 'src/app/model/usuario.model';
import { JwtService } from 'src/app/service/jwt.service';
import { PerfilService } from 'src/app/service/perfil.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  usuario: Usuario = null;
  perfil: Perfil = null;
  sidebarVisible: boolean;
  tooltipOptions: TooltipOptions = {
    autoHide: false,
    tooltipEvent: 'hover',
    tooltipPosition: 'top'
};
  suscription: Subscription;

  constructor(private jwt: JwtService,private perfilService: PerfilService, private router: Router) { }

  ngOnInit() {
    this.usuario = this.jwt.checkToken()
  }

  getPerfil(){
    this.perfilService.getProfilebyUserID(this.usuario.id).subscribe((data: Perfil) => {
      console.log(data)
      this.perfil = data;
    })
  }

  logOut(){
    let token = localStorage.setItem('token',"")
    this.router.navigateByUrl("/login");

  }
}
