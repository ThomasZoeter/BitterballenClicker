import {signal} from '@angular/core';

export class GameState {
  public realBB = 0
  public allTimeBB = 0

  public baseBpS = 0
  public BpSModifier = 1
  public BpS = this.baseBpS * this.BpSModifier

  public baseClickingPower = 1
  public clickingPowerModifier = 1
  public actualClickingPower = this.baseClickingPower * this.clickingPowerModifier
}
