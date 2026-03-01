import {
  Component, DoCheck,
  OnInit,
  OnDestroy, signal
} from '@angular/core';
import {interval, Subscription} from 'rxjs';
import {Game} from "../backend/game";
import {Buildings} from './buildings/buildings';
import {BuildingType} from '../backend/buildingType';
import {BuildingComponent} from './buildings/building-component';

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
  public buyBuilding(name: string) {
    this.onScreenBB.update(() => this.game.buyBuilding(name))
    const thisBuilding = this.game.getAllBuildings().find(b => b.name === name)
    if (thisBuilding != undefined) {
      console.log(thisBuilding.amount)
    }
  }

  public setHidden(name: string): boolean {
    const thisBuilding = this.game.getAllBuildings().find(b => b.name === name)
    return !(thisBuilding != undefined && thisBuilding.cost / 2 <= this.game.getGameState().allTimeBB );
  }

  public setBuyable(name: string) {
    const thisBuilding = this.game.getAllBuildings().find(b => b.name === name)
    return !(thisBuilding != undefined && thisBuilding.cost <= this.game.getGameState().realBB );
  }

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
