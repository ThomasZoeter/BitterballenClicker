import {
  Component, DoCheck,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'game-view',
  standalone: true,
  imports: [],
  styleUrl: './game-view.css',
  template: `
  <div class="top">
    <p>TOP</p>
  </div>
  <div class="left">
    <h2>Number of bitterballen:</h2>
    <h2>{{ onScreenBB }}</h2>
    <div class="bitterbal">
      <p>Bitterbal</p>
    </div>
  </div>
  <div class="middle">
    <p>middle</p>

  </div>
  <div class="right">
    <p>right</p>

  </div>


  `
})
export class Game {
  public onScreenBB = 0
}