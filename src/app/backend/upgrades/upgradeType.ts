export type UpgradeType = {
  id: number
  name: string
  description: string
  cost: number
  effectOnBuilding: string
  effectOnBaseClicker: number
  effectOnModClicker: number
  effectOnModBps: number
  hasBeenBought: boolean
}

export const UPGRADES: UpgradeType[] = [
  {
    id: 1,
    name: "Clicker_1",
    description: "This upgrade will increases base clickerpower.",
    cost: 50,
    effectOnBuilding: "",
    effectOnBaseClicker: 1,
    effectOnModClicker: 0,
    effectOnModBps: 0,
    hasBeenBought: false
  },
  {
    id: 2,
    name: "BpS_1",
    description: "This upgrade will increases BpS modifier with 100%.",
    cost: 150,
    effectOnBuilding: "",
    effectOnBaseClicker: 0,
    effectOnModClicker: 0,
    effectOnModBps: 100,
    hasBeenBought: false
  },
  {
    id: 3,
    name: "FrituurMod_1",
    description: "Doubles bitterballen created by frituur.",
    cost: 250,
    effectOnBuilding: "Frituur",
    effectOnBaseClicker: 0,
    effectOnModClicker: 0,
    effectOnModBps: 0,
    hasBeenBought: false
  }
]
