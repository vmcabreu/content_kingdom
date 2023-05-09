import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/model/usuario.model';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  usuario: Usuario;
  constructor(private userService: UsuarioService){}

  newUsuarios: Usuario[]=[];

  suscription: Subscription;

  ngOnInit(): void {
    this.getNewUsuarios()
    this.suscription = this.userService.getRefresh$.subscribe(() => {
      this.getNewUsuarios();
    })
  }

  getNewUsuarios():void{
    this.userService.getNewUserList().subscribe(
      (data: Usuario[]) => {
        this.newUsuarios = data;
      }
    );
  }
}
