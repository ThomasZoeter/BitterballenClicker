import {
  Component, DoCheck,
  OnInit,
  OnDestroy, signal
} from '@angular/core';
import {interval, Subscription, toArray} from 'rxjs';
import {Game} from "../backend/game";
import {BuildingType} from '../backend/buildings/buildingType';
import {BuildingComponent} from './building-component/building-component';
import {UpgradeType} from '../backend/upgrades/upgradeType';
import {UpgradeComponent} from './upgrade-component/upgrade-component';
import {InfoComponent} from './info-screen/info-component';
import {LocalStorageService} from '../backend/local-storage/localStorage';

@Component({
  selector: 'game-view',
  standalone: true,
  imports: [
    BuildingComponent,
    UpgradeComponent,
    InfoComponent
  ],
  styleUrl: './game-view.css',
  templateUrl: './game-view.html'
})
export class GameView implements OnInit, OnDestroy, DoCheck {
  public onScreenBB = signal(0)
  public onScreenTotalBB = signal(0)
  game: Game = new Game()
  public buildings: BuildingType[] = []
  public upgrades: UpgradeType[] = []

  private timerSubscription: Subscription | undefined;

  constructor(private localStore: LocalStorageService) {
  }

  ngOnInit(): void {
    this.game = new Game()
    this.buildings = this.game.getAllBuildings();
    this.upgrades = this.game.getAllUpgrades()
    if(this.localStore.getData("realBB") !== null) {
      this.getLocalDataOnInit()
    }

    // interval(1000) emits a value every 1000ms (1 second)
    this.timerSubscription = interval(1000).subscribe(() => {
      this.onScreenBB.update(() => this.game.addBpS())
      this.onScreenTotalBB.update(() => this.game.getGameState().allTimeBB)
    });
  }

  private getLocalDataOnInit() {
    this.game.getGameState().realBB = Number(this.localStore.getData("realBB"))
    this.game.getGameState().allTimeBB = Number(this.localStore.getData("allTimeBB"))
    this.game.getGameState().BpS = Number(this.localStore.getData("BpS"))

  }

  saveData() {
    this.localStore.setData("realBB",this.game.getGameState().realBB.toString())
    this.localStore.setData("allTimeBB",this.game.getGameState().allTimeBB.toString())
    this.localStore.setData("BpS",this.game.getGameState().BpS.toString())

  }

  clearData() {
    this.game.getGameState().setGameStateTpDefault()
    this.localStore.clearData()
  }

  public clickOnB() {
    this.onScreenBB.update(() => this.game.clickBB())
  }

  ngOnDestroy(): void {
    this.saveData()
    // Unsubscribe to prevent memory leaks when the component is destroyed
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  ngDoCheck() {

  }
}
