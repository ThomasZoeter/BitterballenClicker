import {LocalStorageService} from './local-storage-service';
import {Game} from '../game';
import {BUILDINGS, getBuildingCount, setBuildingCount} from '../buildings/buildingType';
import {UPGRADES} from '../upgrades/upgradeType';

export class LocalStorageUser {
  constructor(private localStorage: LocalStorageService, private game: Game) {
  }

  clearData() {
    this.game.getGameState().setGameStateToDefault()
    this.localStorage.clearData()
  }

  getLocalDataOnInit() {
    this.game.getGameState().realBB = Number(this.localStorage.getData("realBB"))
    this.game.getGameState().allTimeBB = Number(this.localStorage.getData("allTimeBB"))

    this.game.getGameState().BpS = Number(this.localStorage.getData("BpS"))
    this.game.getGameState().baseBpS = Number(this.localStorage.getData("baseBps"))
    this.game.getGameState().BpSModifier = Number(this.localStorage.getData("BpSModifier"))

    this.game.getGameState().actualClickingPower = Number(this.localStorage.getData("actualClickingPower"))
    this.game.getGameState().baseClickingPower = Number(this.localStorage.getData("baseClickingPower"))
    this.game.getGameState().clickingPowerModifier = Number(this.localStorage.getData("clickingPowerModifier"))

    // get all buildingscounts from local storage
    for(const building of BUILDINGS) {
      setBuildingCount(building.name,Number(this.localStorage.getData(building.name + "Count")))
    }

    for (const upgrade of UPGRADES) {
      upgrade.hasBeenBought = this.localStorage.getData(upgrade.name) == "true"
    }
  }

  saveData() {
    this.localStorage.setData("realBB",this.game.getGameState().realBB.toString())
    this.localStorage.setData("allTimeBB",this.game.getGameState().allTimeBB.toString())

    this.localStorage.setData("BpS",this.game.getGameState().BpS.toString())
    this.localStorage.setData("baseBps",this.game.getGameState().baseBpS.toString())
    this.localStorage.setData("BpSModifier",this.game.getGameState().BpSModifier.toString())

    this.localStorage.setData("actualClickingPower",this.game.getGameState().actualClickingPower.toString())
    this.localStorage.setData("baseClickingPower",this.game.getGameState().baseClickingPower.toString())
    this.localStorage.setData("clickingPowerModifier",this.game.getGameState().clickingPowerModifier.toString())

    // save all buildings as <buildingname>Count in local storage
    for(const building of BUILDINGS) {
      this.localStorage.setData(building.name + "Count",getBuildingCount(building.name).toString())
    }

    for (const upgrade of UPGRADES) {
      if(upgrade.hasBeenBought) {
        this.localStorage.setData(upgrade.name,"true")
      }
    }

    // save last save date so that offline count can be done
    const dateTimeOnLastSave = new Date()
    this.localStorage.setData("dateTimeSinceLastSave",dateTimeOnLastSave.toString())
  }

  addBBsWhileAway(): number {
    let dateTimeWhileAwayString = this.localStorage.getData("dateTimeSinceLastSave")
    let BBsWhileAway = 0
    if(dateTimeWhileAwayString != null){
      let dateTimeSinceLastSave = new Date(dateTimeWhileAwayString)
      const currentDate = new Date()
      BBsWhileAway = this.getTimeDiff(dateTimeSinceLastSave, currentDate) * this.game.getGameState().BpS
      this.game.getGameState().realBB += BBsWhileAway
      this.game.getGameState().allTimeBB += BBsWhileAway
    }
    return BBsWhileAway
  }

  private getTimeDiff(startDate: Date, endDate: Date) {
    const diff = endDate.getTime() - startDate.getTime();
    return Math.floor(diff / 1000) //in milliseconds, so divide by 1000 to get seconds
  }
}
