import {LocalStorageService} from './local-storage-service';
import {Game} from '../game';

export class LocalStorageUser {
  private readonly game: Game;

  constructor(private localStorage: LocalStorageService, game: Game) {
    this.game = game
  }

  clearData() {
    this.game.getGameState().setGameStateToDefault()
    this.localStorage.clearData()
  }

  getLocalDataOnInit() {
    this.game.getGameState().realBB = Number(this.localStorage.getData("realBB"))
    this.game.getGameState().allTimeBB = Number(this.localStorage.getData("allTimeBB"))
    this.game.getGameState().BpS = Number(this.localStorage.getData("BpS"))
    // TODO: retrieve more data
  }

  saveData() {
    this.localStorage.setData("realBB",this.game.getGameState().realBB.toString())
    this.localStorage.setData("allTimeBB",this.game.getGameState().allTimeBB.toString())
    this.localStorage.setData("BpS",this.game.getGameState().BpS.toString())

    // save last save date so that offline count can be done
    const dateTimeOnLastSave = new Date()
    this.localStorage.setData("dateTimeSinceLastSave",dateTimeOnLastSave.toString())

    // TODO: add more data to save, like buildings and upgrades

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
