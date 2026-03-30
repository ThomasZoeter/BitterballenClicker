import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {interval, Subscription} from 'rxjs';
import {Game} from "../backend/game";
import {BUILDINGS, BuildingType} from '../backend/buildings/buildingType';
import {UPGRADES, UpgradeType} from '../backend/upgrades/upgradeType';
import {LocalStorageService} from '../backend/local-storage/local-storage-service';
import {LocalStorageUser} from '../backend/local-storage/local-storage-user';
import {BuyablesComponent} from './buyables-component/buyables-component';
import {BBScreenComponent} from './BB-screen-component/BB-screen-component';
import {BBComponent} from './BB-screen-component/BB-background-component/BB-rain-component/BB-component/BB-component';
import {MiddleScreenComponent} from './middle-screen-component/middle-screen-component';

@Component({
  selector: 'game-view',
  standalone: true,
  imports: [
    BuyablesComponent,
    BBScreenComponent,
    MiddleScreenComponent
  ],
  styleUrl: './game-view.css',
  templateUrl: './game-view.html'
})
export class GameView implements OnInit, OnDestroy {
  public buildings: BuildingType[] = []
  public upgrades: UpgradeType[] = []
  BBsWhileAway = 0
  hideBBsWhileAwayBlock = true
  localStorageUser: LocalStorageUser
  private timerSubscriptionSave: Subscription | undefined;
  private timerSubscriptionBpS: Subscription | undefined;

  @ViewChild(BBComponent) BB:BBComponent

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
    this.timerSubscriptionSave = interval(5000).subscribe(() => {
      this.localStorageUser.saveData()
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks when the component is destroyed
    if (this.timerSubscriptionSave) {
      this.timerSubscriptionSave.unsubscribe();
    }
    if (this.timerSubscriptionBpS) {
      this.timerSubscriptionBpS.unsubscribe();
    }
  }
}
