export type BuildingType =
  {
    name: string
    description: string
    costBase: number
    costTotal: number
    effectBpS: number
    amount: number
  }

export const BUILDINGS: BuildingType[] = [
  {
    name: "Autoclicker",
    description: "This is an autoclicker.",
    costBase: 10,
    costTotal: 10,
    effectBpS: 1,
    amount: 0,
  },
  {
    name: "Frituur",
    description: "This is a frituur.",
    costBase: 100,
    costTotal: 100,
    effectBpS: 5,
    amount: 0,
  }, {
    name: "Snackbar",
    description: "This is a snackbar.",
    costBase: 500,
    costTotal: 500,
    effectBpS: 10,
    amount: 0,
  },
  {
    name: "Factory",
    description: "This is a factory to create bitterballen.",
    costBase: 1500,
    costTotal: 1500,
    effectBpS: 50,
    amount: 0,
  }
]
