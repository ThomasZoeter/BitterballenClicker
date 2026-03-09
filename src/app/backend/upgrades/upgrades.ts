import {UpgradeType} from './upgradeType';

export class Upgrades {
  clickerMod_1: UpgradeType = {
    name: "clickerMod_1",
    description: "This upgrade will increases base clickerpower.",
    cost: 10,
    effectOnBuilding: "",
    effectOnBaseClicker: 1,
    effectOnModClicker: 0,
    effectOnModBps: 0,
    hasBeenBought: false
  }

  FrituurMod_1: UpgradeType = {
    name: "FrituurMod_1",
    description: "Doubles bitterballen created by frituur.",
    cost: 2000,
    effectOnBuilding: "Frituur",
    effectOnBaseClicker: 0,
    effectOnModClicker: 0,
    effectOnModBps: 0,
    hasBeenBought: false
  }

  getAllUpgrades(): UpgradeType[] {
    return [
      this.clickerMod_1,
      this.FrituurMod_1
    ]
  }
}


