import {UpgradeType} from './upgradeType';

export class Upgrades {
  clicker_1: UpgradeType = {
    name: "Clicker_1",
    description: "This upgrade will increases base clickerpower.",
    cost: 50,
    effectOnBuilding: "",
    effectOnBaseClicker: 1,
    effectOnModClicker: 0,
    effectOnModBps: 0,
    hasBeenBought: false
  }

  BpS_1: UpgradeType = {
    name: "BpS_1",
    description: "This upgrade will increases BpS modifier with 100%.",
    cost: 150,
    effectOnBuilding: "",
    effectOnBaseClicker: 0,
    effectOnModClicker: 0,
    effectOnModBps: 100,
    hasBeenBought: false
  }

  FrituurMod_1: UpgradeType = {
    name: "FrituurMod_1",
    description: "Doubles bitterballen created by frituur.",
    cost: 250,
    effectOnBuilding: "Frituur",
    effectOnBaseClicker: 0,
    effectOnModClicker: 0,
    effectOnModBps: 0,
    hasBeenBought: false
  }

  getAllUpgrades(): UpgradeType[] {
    return [
      this.clicker_1,
      this.BpS_1,
      this.FrituurMod_1
    ]
  }
}


