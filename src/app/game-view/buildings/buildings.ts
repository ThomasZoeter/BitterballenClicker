import {BuildingType} from '../../backend/buildingType';

export class Buildings {
  frituur: BuildingType = {
    name: "frituur",
    description: "This is a frituur",
    cost: 100,
    effectBpS: 1,
    amount: 0,
    hidden: true
  }

  snackbar: BuildingType = {
    name: "snackbar",
    description: "This is a snackbar",
    cost: 500,
    effectBpS: 10,
    amount: 0,
    hidden: true
  }

  factory: BuildingType = {
    name: "factory",
    description: "This is a factory to create bitterballen",
    cost: 1500,
    effectBpS: 50,
    amount: 0,
    hidden: true
  }

  getAllBuildings(): BuildingType[] {
    return [
      this.frituur,
      this.snackbar,
      this.factory
    ]
  }


}
