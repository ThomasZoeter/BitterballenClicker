import {Component, Input, OnDestroy, OnInit, signal,} from '@angular/core';


import {interval, Subscription} from 'rxjs';
import {GameState} from '../../../../backend/game-state';
import {Game} from '../../../../backend/game';

@Component({
  selector: 'BB-component',
  standalone: true,
  styleUrl: './BB-component.css',
  imports: [
  ],
  templateUrl: './BB-component.html'

})

export class BBComponent implements OnDestroy, OnInit{
  public onScreenBB = signal(0)
  public onScreenTotalBB = signal(0)

  gameState: GameState
  private timerSubscription: Subscription | undefined;
  private timerSubscriptionStart: Subscription | undefined;
  constructor(private game: Game) {
    this.gameState = this.game.getGameState()
  }

  public clickOnB() {
    this.onScreenBB.update(() => this.game.clickBB())
  }

  ngOnInit() {
    const startup = Math.floor(this.gameState.realBB / 20)
    let start = 0
    this.timerSubscriptionStart = interval(50).subscribe(() => {
      start += startup
      this.onScreenBB.update(() => start)
    });
    setTimeout(() => {
      // Unsubscribes BOTH subscription and childSubscription
      if (this.timerSubscriptionStart instanceof Subscription) {
        this.timerSubscriptionStart.unsubscribe();
      }
    }, 1000);


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
