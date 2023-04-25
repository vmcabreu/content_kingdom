import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/service/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  nombre: string;
  passwd: string;
  repeatpasswd: string;
  email: string;
  error: string = "";

  constructor(private auth: AuthServiceService, private router: Router) {

  }

  register() {
    if (this.validParams) {
      this.auth.register(this.nombre, this.passwd, this.email).subscribe();
    }

  }


  validParams(): boolean {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
    if (this.nombre == "") {
      this.error += "Nombre de usuario no válido"
      return false;
    }
    if (passwordRegex.test(this.passwd)) {
      this.error += "\n La contraseña debe de tener al menos un mayúscula, un número y un carácter especial [@$!%*?&]"
      return false;
    }
    if (this.passwd != this.repeatpasswd) {
      this.error += " \n Las contraseñas no coinciden"
      return false;
    }
    if (emailRegex.test(this.email)) {
      this.error += "\nEmail no válido"
      return false;
    }
    return true;
  }
}
