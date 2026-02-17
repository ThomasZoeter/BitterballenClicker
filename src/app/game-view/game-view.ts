import {
  Component, DoCheck,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'game-view',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
  ],
  template: `
  <p>JOOOOOOOOOOOOO</p>

  `
})
export class Game {}