import {BuildingType} from './buildingType';

export class Buildings {
  autoClicker: BuildingType = {
    name: "Autoclicker",
    description: "This is an autoclicker.",
    costBase: 10,
    costTotal: 10,
    effectBpS: 1,
    amount: 0,
  }

  frituur: BuildingType = {
    name: "Frituur",
    description: "This is a frituur.",
    costBase: 100,
    costTotal: 100,
    effectBpS: 5,
    amount: 0,
  }

  snackbar: BuildingType = {
    name: "Snackbar",
    description: "This is a snackbar.",
    costBase: 500,
    costTotal: 500,
    effectBpS: 10,
    amount: 0,
  }

  factory: BuildingType = {
    name: "Factory",
    description: "This is a factory to create bitterballen.",
    costBase: 1500,
    costTotal: 1500,
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
