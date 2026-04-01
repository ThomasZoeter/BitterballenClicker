import {
  ChangeDetectorRef,
  Component, Input, OnInit, computed
} from '@angular/core';
import {BuildingType} from "../../../backend/buildings/buildingType"
import {Game} from '../../../backend/game';

@Component({
  selector: 'building-component',
  standalone: true,
  styleUrl: './building-component.css',
  imports: [],
  templateUrl: './building-component.html'

})

export class BuildingComponent implements OnInit {
  @Input() building: BuildingType
  @Input() buying: boolean
  hovertext: string | undefined = ""

  constructor(protected game: Game, private ref: ChangeDetectorRef) {
  }

  shouldBuy = computed(() => this.game.getGameState().realBBSig() >= this.building.costTotal);

  public setHidden(building: BuildingType): boolean {
    return !(building != undefined && building.costTotal / 2 <= this.game.getGameState().allTimeBB);
  }

  public isSellable(): boolean {
    this.ref.detectChanges();
    return this.building != undefined && this.building.amount > 0
  }

  public buyOrSell() {
    if (this.buying && this.shouldBuy()) {
      this.game.buyBuilding(this.building)
      this.hovertext = this.setDescription(this.building)
    } else if (!this.buying && this.isSellable())
      this.game.sellBuilding(this.building)
      this.hovertext = this.setDescription(this.building)
  }


  private setDescription(building: BuildingType): string {
    let totalGenerated = 0
    if (building.amount != undefined && building.effectBpS != undefined) {
      totalGenerated = building.amount * building.effectBpS
    }
    return <string>building.description + "\n"
      + "1 of this building will generated " + building.effectBpS + " bitterballen every second.\n"
      + "You currently have " + building.amount + " of this building.\n"
      + "These generate " + totalGenerated + " bitterballen every second."
  }

  ngOnInit(): void {
    this.hovertext = this.setDescription(this.building)
    // Set cost of building based on number of buildings you have
    if (this.building.amount > 0) {
      this.building.costTotal = Math.floor(this.building.costBase * Math.pow(this.building.amount, 2))
    }
  }
}
