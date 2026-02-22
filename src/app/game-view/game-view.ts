import {
  Component, DoCheck,
  OnInit,
  ChangeDetectorRef,
  OnDestroy
} from '@angular/core';
import { interval, Subscription } from 'rxjs';
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
    <div class="bitterbal" (click)="clickOnB()">
      <p>Bitterbal</p>
    </div>
  </div>
  <div class="middle">
    <p>middle</p>
  </div>
  <div class="right">
    <p>right</p>
    <div class="upgrades">
      <p>upgrades</p>
    </div>
    <div class="buildings">
      <p>Buildings</p>
    </div>
  </div>


  `
})
export class Game {
  public onScreenBB = 0
  private realBB = 0
  private BpS = 1
  private clickingPower = 1
  private timerSubscription: Subscription | undefined;

  public clickOnB() {
    this.realBB = this.realBB + this.clickingPower
    this.onScreenBB = this.realBB
  }

  //   ngOnInit(): void {
  //   // interval(1000) emits a value every 1000ms (1 second)
  //   this.timerSubscription = interval(1000).subscribe(() => {
  //     this.onScreenBB = this.onScreenBB + this.BpS
  //   });
  // }

  // ngOnDestroy(): void {
  //   // Unsubscribe to prevent memory leaks when the component is destroyed
  //   if (this.timerSubscription) {
  //     this.timerSubscription.unsubscribe();
  //   }
  // }

}