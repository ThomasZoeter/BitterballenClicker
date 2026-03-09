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

  addBBsSinceLastSave(): number {
    let dateTimeSinceLastSaveString = this.localStorage.getData("dateTimeSinceLastSave")
    let BBsSinceLastSave = 0
    if(dateTimeSinceLastSaveString != null){
      let dateTimeSinceLastSave = new Date(dateTimeSinceLastSaveString)
      const currentDate = new Date()
      BBsSinceLastSave = this.getTimeDiff(dateTimeSinceLastSave, currentDate) * this.game.getGameState().BpS
      this.game.getGameState().realBB += BBsSinceLastSave
      this.game.getGameState().allTimeBB += BBsSinceLastSave
    }
    return BBsSinceLastSave
  }

  private getTimeDiff(startDate: Date, endDate: Date) {
    const diff = endDate.getTime() - startDate.getTime();
    return Math.floor(diff / 1000) //in milliseconds, so divide by 1000 to get seconds
  }
}
