import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
  valid: boolean = false;

  constructor( private router: Router) {

  }
/*
  register() {
    if (this.valid) {
      this.auth.register(this.nombre, this.passwd, this.email).subscribe();
      this.valid = false;
    }

  }

  validParams() {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
    let valido = true;
    if (this.nombre == "") {
      this.error += "Nombre de usuario no válido";
      valido = false;
    }
    if (passwordRegex.test(this.passwd)) {
      this.error += "\n La contraseña debe de tener al menos un mayúscula, un número y un carácter especial [@$!%*?&]";
      valido = false;
    }
    if (this.passwd != this.repeatpasswd) {
      this.error += " \n Las contraseñas no coinciden";
      valido = false;
    }
    if (emailRegex.test(this.email)) {
      this.error += "\nEmail no válido";
      valido = false;
    }
    if (valido) {
      this.error = "";
      this.valid = true;
    }
  }
  */
}
