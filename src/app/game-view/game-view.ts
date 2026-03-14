import {Component, DoCheck, OnDestroy, OnInit, signal} from '@angular/core';
import {interval, Subscription} from 'rxjs';
import {Game} from "../backend/game";
import {BUILDINGS, BuildingType} from '../backend/buildings/buildingType';
import {UPGRADES, UpgradeType} from '../backend/upgrades/upgradeType';
import {StatsComponent} from './stats-screen/stats-component';
import {LocalStorageService} from '../backend/local-storage/local-storage-service';
import {LocalStorageUser} from '../backend/local-storage/local-storage-user';
import {BuyablesComponent} from './buyables-component/buyables-component';
import {BBScreenComponent} from './BB-screen-component/BB-screen-component';

@Component({
  selector: 'game-view',
  standalone: true,
  imports: [
    StatsComponent,
    BuyablesComponent,
    BBScreenComponent
  ],
  styleUrl: './game-view.css',
  templateUrl: './game-view.html'
})
export class GameView implements OnInit {
  public buildings: BuildingType[] = []
  public upgrades: UpgradeType[] = []
  BBsWhileAway = 0
  hideBBsWhileAwayBlock = true
  middleScreen = 'Default'
  localStorageUser: LocalStorageUser

  constructor(private localStore: LocalStorageService, private game: Game) {
  }

  ngOnInit(): void {
    this.buildings = BUILDINGS;
    this.upgrades = UPGRADES;
    this.localStorageUser = new LocalStorageUser(this.localStore, this.game)

    if (this.localStore.getData("realBB") !== null) { //so if the localstorage is  not empty
      this.localStorageUser.getLocalDataOnInit()
      //Add Bitterballen since last save
      this.BBsWhileAway = this.localStorageUser.addBBsWhileAway()
      if (this.BBsWhileAway > 0) {
        this.hideBBsWhileAwayBlock = false
      }
    }

  }

  public clickMiddleScreen(choice: string) {
    if (choice === "Statistics") {
      this.middleScreen = "Statistics"
    } else {
      this.middleScreen = "Default"
    }
  }
}
