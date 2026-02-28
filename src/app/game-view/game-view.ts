import {
  Component, DoCheck,
  OnInit,
  ChangeDetectorRef,
  OnDestroy, signal
} from '@angular/core';
import {interval, Subscription} from 'rxjs';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {Game} from "../backend/game";
import {Buildings} from './buildings/buildings';
import {BuildingType} from '../backend/buildingType';

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
          <h2>{{ onScreenBB() }}</h2>
          <div class="bitterbal" (click)="clickOnB()">
              <p>Bitterbal</p>
          </div>
      </div>
      <div class="middle">
          <p>middle</p>
      </div>
      <div class="right">
          <p>right</p>
          <div class="upgradeBlock">
              <!--              <button class="upgrade" [disabled]="(onScreenBB()) < 15" [hidden]="(onScreenBB()) < 15" (click)="buyUpgrade(15,1)">Mod</button>-->
              <!--              <button class="upgrade" [disabled]="(onScreenBB()) < 120" [hidden]="(onScreenBB()) < 1000" (click)="buyUpgrade(1200,10)">Mod2</button>-->
          </div>
          <div class="buildingBlock">
              @for (building of buildings;let idx = $index;track idx) {
                  <button class="building"
                          (click)="buyBuilding(building.name)"
                          [hidden]="setHidden(building.name)"
                          [disabled]="setBuyable((building.name))"

                  >{{ building.name }}, cost: {{ building.cost }}, number bought: {{ building.amount }}
                  </button>
              }
              <!--              <button class="building" [disabled]="(onScreenBB()) < 50" [hidden]="(onScreenBB()) < 10" (click)="buyClickerUpgrade(50,1)">Clicker</button>-->
              <!--              <button class="building" [disabled]="(onScreenBB()) < 150" [hidden]="(onScreenBB()) < 100" (click)="buyBuilding(150,1)">Frituur</button>-->
              <!--              <button class="building" [disabled]="(onScreenBB()) < 1200" [hidden]="(onScreenBB()) < 1000" (click)="buyBuilding(1200,5)">Snackbar</button>-->
          </div>
      </div>


  `
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
    return !(thisBuilding != undefined && thisBuilding.cost / 2 <= this.game.getGameState().realBB );
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
