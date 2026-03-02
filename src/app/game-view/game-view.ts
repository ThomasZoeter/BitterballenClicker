import {
  Component, DoCheck,
  OnInit,
  OnDestroy, signal
} from '@angular/core';
import {interval, Subscription} from 'rxjs';
import {Game} from "../backend/game";
import {BuildingType} from '../backend/buildingType';
import {BuildingComponent} from './building-component/building-component';

@Component({
  selector: 'game-view',
  standalone: true,
  imports: [
    BuildingComponent
  ],
  styleUrl: './game-view.css',
  templateUrl: './game-view.html'
})
export class GameView implements OnInit, OnDestroy, DoCheck {
  public onScreenBB = signal(0)
  game: Game = new Game()
  public buildings: BuildingType[] = []

  private timerSubscription: Subscription | undefined;

  public clickOnB() {
    this.onScreenBB.update(() => this.game.clickBB())
  }

  ngOnInit(): void {
    this.game = new Game()
    this.buildings = this.game.getAllBuildings();
    // interval(1000) emits a value every 1000ms (1 second)
    this.timerSubscription = interval(1000).subscribe(() => {
      this.onScreenBB.update(() => this.game.addBpS())
    });
  }

  //
  // public buyClickerUpgrade(price: number, addClickingPower: number) {
  //   this.realBB = this.realBB - price
  //   this.baseClickingPower = this.baseClickingPower + addClickingPower
  //   this.actualClickingPower = this.baseClickingPower * this.clickingPowerModifier
  //   this.onScreenBB.update(() => this.realBB)
  // }
  //

  //
  // public buyUpgrade(price: number, addMod: number) {
  //   this.realBB = this.realBB - price
  //   this.BpSModifier = this.BpSModifier + addMod
  //   this.BpS = this.baseBpS * this.BpSModifier
  //   this.onScreenBB.update(() => this.realBB)
  //
  // }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks when the component is destroyed
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  ngDoCheck() {

  }
}
