import {GameState} from "./game-state";
import {BUILDINGS, BuildingType} from './buildings/buildingType';
import {UpgradeType} from './upgrades/upgradeType';
import {Injectable} from '@angular/core';

@Injectable
({
  providedIn: 'root',
})
export class Game {
  private readonly gameState: GameState;

  public getGameState(): GameState {
    return this.gameState;
  }

  constructor() {
    this.gameState = new GameState
  }

  public clickBB(): number {
    this.gameState.realBB += this.gameState.actualClickingPower
    this.gameState.allTimeBB += this.gameState.actualClickingPower
    return this.gameState.realBB
  }

  public addBpS(): number {
    this.gameState.realBB += this.gameState.BpS
    this.gameState.allTimeBB += this.gameState.BpS
    return this.gameState.realBB
  }

  public buyBuilding(selectedBuilding: BuildingType): number {
    this.gameState.realBB -= selectedBuilding.costTotal
    this.gameState.baseBpS += selectedBuilding.effectBpS
    this.gameState.BpS = this.gameState.baseBpS * (this.gameState.BpSModifier / 100)

    selectedBuilding.amount += 1
    selectedBuilding.costTotal = Math.floor(selectedBuilding.costBase * Math.pow(selectedBuilding.amount,2))

    return this.gameState.realBB
  }

  public sellBuilding(selectedBuilding: BuildingType): number {
    selectedBuilding.amount -= 1 //we first decease the amount because we want to use the original cost
    selectedBuilding.costTotal = selectedBuilding.costBase + selectedBuilding.amount * (selectedBuilding.costBase / 2 )
    this.gameState.realBB += selectedBuilding.costTotal
    this.gameState.baseBpS -= selectedBuilding.effectBpS
    this.gameState.BpS = this.gameState.baseBpS * (this.gameState.BpSModifier / 100)
    return this.gameState.realBB
  }

  public buyUpgrade(upgrade: UpgradeType){
    this.gameState.realBB -= upgrade.cost
    this.applyUpgradeEffect(upgrade)
    upgrade.hasBeenBought = true
  }

  public applyUpgradeEffect(upgrade: UpgradeType) {
    if(upgrade.effectOnBuilding != '') {
      const buildingWithEffect = BUILDINGS.find(b => b.name === upgrade.effectOnBuilding)
      if(buildingWithEffect !== undefined) {
        buildingWithEffect.effectBpS *= 2
      }
    }
    this.gameState.clickingPowerModifier += upgrade.effectOnModClicker
    this.gameState.baseClickingPower += upgrade.effectOnBaseClicker
    this.gameState.actualClickingPower = this.gameState.baseClickingPower * (this.gameState.clickingPowerModifier / 100)

    this.gameState.BpSModifier += upgrade.effectOnModBps
    this.gameState.BpS = this.gameState.baseBpS * (this.gameState.BpSModifier / 100)
  }
}
