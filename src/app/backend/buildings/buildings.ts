import {BuildingType} from './buildingType';

export class Buildings {
  autoClicker: BuildingType = {
    name: "autoclicker",
    description: "This is an autoclicker",
    cost: 10,
    effectBpS: 1,
    amount: 0,
  }

  frituur: BuildingType = {
    name: "frituur",
    description: "This is a frituur",
    cost: 100,
    effectBpS: 5,
    amount: 0,
  }

  snackbar: BuildingType = {
    name: "snackbar",
    description: "This is a snackbar",
    cost: 500,
    effectBpS: 10,
    amount: 0,
  }

  factory: BuildingType = {
    name: "factory",
    description: "This is a factory to create bitterballen",
    cost: 1500,
    effectBpS: 50,
    amount: 0,
  }

  getAllBuildings(): BuildingType[] {
    return [
      this.autoClicker,
      this.frituur,
      this.snackbar,
      this.factory
    ]
  }


}
