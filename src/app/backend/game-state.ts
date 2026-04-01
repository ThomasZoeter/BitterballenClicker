import {signal} from '@angular/core';
import {BUILDINGS} from './buildings/buildingType';
import {UPGRADES} from './upgrades/upgradeType';

export class GameState {
  public realBB = 0
  public realBBSig = signal(0)

  public allTimeBB = 0
  public allTimeBBScreen = signal(0)

  public baseBpS = 0
  public BpSModifier = 100
  public BpS = 0 // this.baseBpS * this.BpSModifier

  public baseClickingPower = 1
  public clickingPowerModifier = 100
  public actualClickingPower = 1 // this.baseClickingPower * this.clickingPowerModifier

  setGameStateToDefault() {
    this.realBB = 0
    this.allTimeBB = 0

    this.baseBpS = 0
    this.BpSModifier = 100
    this.BpS = 0

    this.baseClickingPower = 1
    this.clickingPowerModifier = 100
    this.actualClickingPower = 1

    for (const building of BUILDINGS) {
      building.amount = 0
    }
    for (const upgrade of UPGRADES) {
      upgrade.hasBeenBought = false
    }
  }
}
