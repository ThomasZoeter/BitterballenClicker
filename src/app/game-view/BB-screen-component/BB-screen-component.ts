import {Component, Input} from '@angular/core';
import {Game} from '../../backend/game';
import {BBBackgroundComponent} from './BB-background-component/BB-background-component';
import {LocalStorageUser} from '../../backend/local-storage/local-storage-user';

@Component({
  selector: 'BB-screen-component',
  standalone: true,
  styleUrl: './BB-screen-component.css',
  imports: [
    BBBackgroundComponent
  ],
  templateUrl: './BB-screen-component.html'

})

export class BBScreenComponent {
  @Input() localStorageUser: LocalStorageUser;

  BB = 0;

  constructor(protected game: Game) {
  }

  setBBOnDevMode(val: number) {
    this.BB = val;
    this.game.setBBs(this.BB);
  }

}
