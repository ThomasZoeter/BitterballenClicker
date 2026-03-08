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

    console.log("Previous:" + this.localStorage.getData("dateTimeSinceLastSave"))

  }

  saveData() {
    this.localStorage.setData("realBB",this.game.getGameState().realBB.toString())
    this.localStorage.setData("allTimeBB",this.game.getGameState().allTimeBB.toString())
    this.localStorage.setData("BpS",this.game.getGameState().BpS.toString())

    const dateTimeOnLastSave = new Date()
    this.localStorage.setData("dateTimeSinceLastSave",dateTimeOnLastSave.toLocaleString())

  }

  getBBsSinceLastOnline(dateSinceLastSave: Date): number {
    const currentDate = new Date()
    // We calculate how many seconds were between now and the last save, and multiply that with the BpS
    return this.getTimeDiff(dateSinceLastSave, currentDate) * this.game.getGameState().BpS
  }

  private getTimeDiff(startDate: Date, endDate: Date) {
    const diff = endDate.getTime() - startDate.getTime();
    const days = Math.floor(diff / (60 * 60 * 24 * 1000));
    const hours = Math.floor(diff / (60 * 60 * 1000)) - (days * 24);
    const minutes = Math.floor(diff / (60 * 1000)) - ((days * 24 * 60) + (hours * 60));
    return Math.floor(diff / 1000) - ((days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60))
  }
}
