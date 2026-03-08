import {GameState} from "./game-state";
import {Buildings} from './buildings/buildings';
import {BuildingType} from './buildings/buildingType';
import {Upgrades} from './upgrades/upgrades';
import {UpgradeType} from './upgrades/upgradeType';

export class Game {
  private readonly gameState: GameState;
  buildings: Buildings
  upgrades: Upgrades

  public getGameState(): GameState {
    return this.gameState;
  }

  public getAllBuildings(): BuildingType[] {
    return this.buildings.getAllBuildings()
  }

  public getAllUpgrades(): UpgradeType[] {
    return this.upgrades.getAllUpgrades()
  }

  constructor() {
    this.gameState = new GameState
    this.buildings = new Buildings()
    this.upgrades = new Upgrades()
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

  public buyBuilding(selectedBuilding: BuildingType | undefined): number {
    // const selectedBuilding = this.getAllBuildings().find(b => b.name === name)
    if (selectedBuilding == undefined) {
      throw new Error("undefined")
    }
    this.gameState.realBB -= selectedBuilding.cost
    this.gameState.baseBpS += selectedBuilding.effectBpS
    this.gameState.BpS = this.gameState.baseBpS * this.gameState.BpSModifier
    selectedBuilding.cost *= 2
    selectedBuilding.amount += 1
    return this.gameState.realBB
  }

  public sellBuilding(selectedBuilding: BuildingType | undefined): number {
    if (selectedBuilding == undefined) {
      throw new Error("undefined")
    }
    this.gameState.realBB += selectedBuilding.cost / 4 //because after buying one the cost doubles, so to get half of the original value you need to divide it bhy 4
    this.gameState.baseBpS -= selectedBuilding.effectBpS
    this.gameState.BpS = this.gameState.baseBpS * this.gameState.BpSModifier
    selectedBuilding.cost /= 2
    selectedBuilding.amount -= 1
    return this.gameState.realBB
  }

  public buyUpgrade(upgrade: UpgradeType | undefined){
    if(upgrade == undefined) {
      throw new Error("undefined")
    }
    this.gameState.realBB -= upgrade.cost
    if(upgrade.effectOnBuilding != '') {
      const buildingWithEffect = this.getAllBuildings().find(b => b.name === upgrade.effectOnBuilding)
      if(buildingWithEffect != undefined) {
        buildingWithEffect.effectBpS *= 2
      }
    }
    this.gameState.clickingPowerModifier *= upgrade.effectOnModClicker + 1
    this.gameState.baseClickingPower += upgrade.effectOnBaseClicker
    this.gameState.actualClickingPower = this.gameState.baseClickingPower * this.gameState.clickingPowerModifier

    this.gameState.BpSModifier *= upgrade.effectOnModBps + 1
    this.gameState.BpS = this.gameState.baseBpS * this.gameState.BpSModifier

    upgrade.hasBeenBought = true

  }
}
