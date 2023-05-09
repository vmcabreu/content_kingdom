import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent {

  suscription: Subscription;
}
