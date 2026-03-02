import {GameState} from "./game-state";
import {Buildings} from './buildings';
import {BuildingType} from './buildingType';

export class Game {
  private readonly gameState: GameState;
  buildings: Buildings

  public getGameState(): GameState {
    return this.gameState;
  }

  public getAllBuildings(): BuildingType[] {
    return this.buildings.getAllBuildings()
  }

  constructor() {
    this.gameState = new GameState
    this.buildings = new Buildings()
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

  public buyBuilding(name: string | undefined): number {
    const selectedBuilding = this.getAllBuildings().find(b => b.name === name)
    if (selectedBuilding == undefined) {
      throw new Error("undefined")
    }
    this.gameState.realBB -= selectedBuilding.cost
    this.gameState.BpS += selectedBuilding.effectBpS
    selectedBuilding.cost *= 2
    selectedBuilding.amount += 1
    return this.gameState.realBB
  }

  public sellBuilding(name: string | undefined): number {
    const selectedBuilding = this.getAllBuildings().find(b => b.name === name)
    if (selectedBuilding == undefined) {
      throw new Error("undefined")
    }
    this.gameState.realBB += selectedBuilding.cost / 4 //because after buying one the cost doubles, so to get half of the original value you need to divide it bhy 4
    this.gameState.BpS -= selectedBuilding.effectBpS
    selectedBuilding.cost /= 2
    selectedBuilding.amount -= 1
    return this.gameState.realBB
  }
}
