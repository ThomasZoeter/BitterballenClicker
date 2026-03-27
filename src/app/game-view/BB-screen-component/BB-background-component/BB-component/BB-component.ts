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
  public onScreenBB = signal("")
  public onScreenTotalBB = signal(0)

  gameState: GameState
  private timerSubscription: Subscription | undefined;
  private timerSubscriptionStart: Subscription | undefined;
  constructor(private game: Game) {
    this.gameState = this.game.getGameState()
  }

  public clickOnB() {
    this.onScreenBB.update(() => this.transformNumBBToString(this.game.clickBB()))
  }

  ngOnInit() {
    // Flow to BB count in 1 sec - subscription
    const startup = Math.floor(this.gameState.realBB / 20)
    let start = 0
    this.timerSubscriptionStart = interval(50).subscribe(() => {
      start += startup
      this.onScreenBB.update(() => this.transformNumBBToString(start))
    });
    setTimeout(() => {
      if (this.timerSubscriptionStart instanceof Subscription) {
        this.timerSubscriptionStart.unsubscribe();
      }
    }, 1000);

    // BpS subscription
    this.timerSubscription = interval(1000).subscribe(() => {
      this.onScreenBB.update(() => this.transformNumBBToString(this.game.addBpS()))
      this.onScreenTotalBB.update(() => this.game.getGameState().allTimeBB)
    });
  }

  private transformNumBBToString(num: number): string {
    let result: string = num + ""
    if(num > 1000) {
      result = num / 1000 + " thousand"
    }
    if(num > 1000000)  {
      result = Math.floor(num / 1000) / 1000 + " million" // In parts to make sure there are 3 digits
    }

    return result;
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks when the component is destroyed
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
}
