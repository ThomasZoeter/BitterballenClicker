import {ChangeDetectorRef, Component, OnDestroy, OnInit, signal,} from '@angular/core';


import {interval, Subscription} from 'rxjs';
import {GameState} from '../../../../../backend/game-state';
import {Game} from '../../../../../backend/game';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'BB-component',
  standalone: true,
  styleUrl: './BB-component.css',
  imports: [
    NgOptimizedImage
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

  doActionPerSecond() {
    this.onScreenBB.update(() => this.transformNumBBToString(this.game.addBpS()))
    this.onScreenTotalBB.update(() => this.game.getGameState().allTimeBB)
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
      this.doActionPerSecond()

    });
  }

  private transformNumBBToString(num: number): string {
    let result: string = num + ""
    if(num > 1000) {
      result = num / 1000 + " thousand"
    }
    if(num > Math.pow(10,6))  {
      result = Math.floor(num / 1000) / 1000 + " million" // In parts to make sure there are 3 digits
    }
    if(num > Math.pow(10,9))  {
      result = Math.floor(num / Math.pow(10,6)) / 1000 + " billion"
    }
    if(num > Math.pow(10,12))  {
      result = Math.floor(num / Math.pow(10,9)) / 1000 + " trillion"
    }
    if(num > Math.pow(10,15))  {
      result = Math.floor(num / Math.pow(10,12)) / 1000 + " quadrillion"
    }
    if(num > Math.pow(10,18))  {
      result = Math.floor(num / Math.pow(10,15)) / 1000 + " quintillion"
    }
    if(num > Math.pow(10,21))  {
      result = Math.floor(num / Math.pow(10,18)) / 1000 + " sextillion"
    }
    if(num > Math.pow(10,24))  {
      result = Math.floor(num / Math.pow(10,21)) / 1000 + " septillion"
    }
    if(num > Math.pow(10,27))  {
      result = Math.floor(num / Math.pow(10,24)) / 1000 + " octillion"
    }
    if(num > Math.pow(10,30))  {
      result = Math.floor(num / Math.pow(10,27)) / 1000 + " nonillion"
    }
    if(num > Math.pow(10,33))  {
      result = Math.floor(num / Math.pow(10,30)) / 1000 + " decillion"
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
