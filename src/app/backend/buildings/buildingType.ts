export type BuildingType =
  {
    name: string
    description: string
    picture: string
    costBase: number
    costTotal: number
    effectBpS: number
    amount: number
  }

export const BUILDINGS: BuildingType[] = [
  {
    name: "Autoclicker",
    description: "This is an autoclicker.",
    picture: "clicker.png",
    costBase: 10,
    costTotal: 10,
    effectBpS: 1,
    amount: 0,
  },
  {
    name: "Deepfryer",
    description: "This is a deepfryer.",
    picture: "deepfryer.png",
    costBase: 10,
    costTotal: 10,
    effectBpS: 5,
    amount: 0,
  }, {
    name: "Snackbar",
    description: "This is a snackbar.",
    picture: "snackbar.png",
    costBase: 50,
    costTotal: 50,
    effectBpS: 10,
    amount: 0,
  },
  {
    name: "Factory",
    description: "This is a factory to create bitterballen.",
    picture: "factory.png",
    costBase: 150,
    costTotal: 150,
    effectBpS: 50,
    amount: 0,
  }
]

export function getBuildingCount(building: String): Number {
  const count = BUILDINGS.find(e => e.name == building)?.amount
  if (count === undefined) {
    return 0
  }
  return count
}

export function setBuildingCount(building: String, count: number) {
  const buildingWithEffect = BUILDINGS.find(e => e.name == building)
  if (buildingWithEffect === undefined) {
    return
  }
  buildingWithEffect.amount = count
}
