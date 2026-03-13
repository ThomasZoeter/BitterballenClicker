import {Component, Input, OnDestroy, OnInit, signal,} from '@angular/core';
import {Game} from '../../backend/game';
import {GameState} from '../../backend/game-state';
import {interval, Subscription} from 'rxjs';

@Component({
  selector: 'BB-screen-component',
  standalone: true,
  styleUrl: './BB-screen-component.css',
  imports: [
  ],
  templateUrl: './BB-screen-component.html'

})

export class BBScreenComponent implements OnDestroy, OnInit{
  public onScreenBB = signal(0)
  public onScreenTotalBB = signal(0)

  gameState: GameState
  private timerSubscription: Subscription | undefined;
  constructor(private game: Game) {
    this.gameState = this.game.getGameState()
  }

  public clickOnB() {
    this.onScreenBB.update(() => this.game.clickBB())
  }

  ngOnInit() {
    // interval(1000) emits a value every 1000ms (1 second)
    this.timerSubscription = interval(1000).subscribe(() => {
      this.onScreenBB.update(() => this.game.addBpS())
      this.onScreenTotalBB.update(() => this.game.getGameState().allTimeBB)
    });
  }



  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks when the component is destroyed
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }



}
