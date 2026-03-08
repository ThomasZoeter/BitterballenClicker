import {Component, DoCheck, OnDestroy, OnInit, signal} from '@angular/core';
import {interval, Subscription} from 'rxjs';
import {Game} from "../backend/game";
import {BuildingType} from '../backend/buildings/buildingType';
import {BuildingComponent} from './building-component/building-component';
import {UpgradeType} from '../backend/upgrades/upgradeType';
import {UpgradeComponent} from './upgrade-component/upgrade-component';
import {InfoComponent} from './info-screen/info-component';
import {LocalStorageService} from '../backend/local-storage/local-storage-service';
import {LocalStorageUser} from '../backend/local-storage/local-storage-user';

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
  game = new Game()
  public buildings: BuildingType[] = []
  public upgrades: UpgradeType[] = []
  localStorageUser: LocalStorageUser
  BBsSinceLastSave = 0


  private timerSubscription: Subscription | undefined;

  constructor(private localStore: LocalStorageService) {
    this.localStorageUser = new LocalStorageUser(localStore, this.game)

  }

  ngOnInit(): void {
    this.buildings = this.game.getAllBuildings();
    this.upgrades = this.game.getAllUpgrades()
    if (this.localStore.getData("realBB") !== null) { //so if the localstorage is  not empty
      this.localStorageUser.getLocalDataOnInit()
    }

    //Add Bitterballen since last save
    this.addBBsSinceLastSave()

    // interval(1000) emits a value every 1000ms (1 second)
    this.timerSubscription = interval(1000).subscribe(() => {
      this.onScreenBB.update(() => this.game.addBpS())
      this.onScreenTotalBB.update(() => this.game.getGameState().allTimeBB)
    });
  }

  public clickOnB() {
    this.onScreenBB.update(() => this.game.clickBB())
  }

  addBBsSinceLastSave() {
    let dateTimeSinceLastSaveString = this.localStore.getData("dateTimeSinceLastSave")
    if(dateTimeSinceLastSaveString != null){
      let dateTimeSinceLastSave = new Date(dateTimeSinceLastSaveString)
      this.BBsSinceLastSave = this.localStorageUser.getBBsSinceLastOnline(dateTimeSinceLastSave)
      this.game.getGameState().realBB += this.BBsSinceLastSave
      this.game.getGameState().allTimeBB += this.BBsSinceLastSave
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
