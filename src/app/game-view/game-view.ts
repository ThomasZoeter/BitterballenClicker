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
  <div class="left">
    <p>left</p>
    <div class='bitterbal'>
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
export class Game {}