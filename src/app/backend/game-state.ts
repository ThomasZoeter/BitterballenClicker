import {signal} from '@angular/core';

export class GameState {
  public realBB = 0
  public allTimeBB = 0

  public baseBpS = 0
  public BpSModifier = 1
  public BpS = 0 // this.baseBpS * this.BpSModifier

  public baseClickingPower = 1
  public clickingPowerModifier = 1
  public actualClickingPower = 1 // this.baseClickingPower * this.clickingPowerModifier

  setGameStateToDefault() {
    this.realBB = 0
    this.allTimeBB = 0

    this.baseBpS = 0
    this.BpSModifier = 1
    this.BpS = 0

    this.baseClickingPower = 1
    this.clickingPowerModifier = 1
    this.actualClickingPower = 1
  }
}
