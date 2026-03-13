import {Component, DoCheck, OnDestroy, OnInit, signal} from '@angular/core';
import {interval, Subscription} from 'rxjs';
import {Game} from "../backend/game";
import {BUILDINGS, BuildingType} from '../backend/buildings/buildingType';
import {UPGRADES, UpgradeType} from '../backend/upgrades/upgradeType';
import {StatsComponent} from './stats-screen/stats-component';
import {LocalStorageService} from '../backend/local-storage/local-storage-service';
import {LocalStorageUser} from '../backend/local-storage/local-storage-user';
import {BuyablesComponent} from './buyables-component/buyables-component';

@Component({
  selector: 'game-view',
  standalone: true,
  imports: [
    StatsComponent,
    BuyablesComponent
  ],
  styleUrl: './game-view.css',
  templateUrl: './game-view.html'
})
export class GameView implements OnInit, OnDestroy, DoCheck {
  public onScreenBB = signal(0)
  public onScreenTotalBB = signal(0)
  game = new Game()
  public buildings: BuildingType[] = []
  public upgrades: UpgradeType[] = []
  localStorageUser: LocalStorageUser
  BBsWhileAway = 0
  hideBBsWhileAwayBlock = true
  middleScreen = 'Default'

  private timerSubscription: Subscription | undefined;

  constructor(private localStore: LocalStorageService) {
    this.localStorageUser = new LocalStorageUser(localStore, this.game)

  }

  ngOnInit(): void {
    this.buildings = BUILDINGS;
    this.upgrades = UPGRADES;
    if (this.localStore.getData("realBB") !== null) { //so if the localstorage is  not empty
      this.localStorageUser.getLocalDataOnInit()
      //Add Bitterballen since last save
      this.BBsWhileAway = this.localStorageUser.addBBsWhileAway()
      if(this.BBsWhileAway > 0) {
        this.hideBBsWhileAwayBlock = false
      }
    }



    // interval(1000) emits a value every 1000ms (1 second)
    this.timerSubscription = interval(1000).subscribe(() => {
      this.onScreenBB.update(() => this.game.addBpS())
      this.onScreenTotalBB.update(() => this.game.getGameState().allTimeBB)
    });
  }

  public clickOnB() {
    this.onScreenBB.update(() => this.game.clickBB())
  }

  public clickMiddleScreen(choice: string) {
    if(choice === "Statistics") {
      this.middleScreen = "Statistics"
    }
    else {
      this.middleScreen = "Default"
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks when the component is destroyed
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  ngDoCheck() {

  }
}
