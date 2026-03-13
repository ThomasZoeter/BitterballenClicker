import {
  Component, Input
} from '@angular/core';
import {BuildingType} from "../../../backend/buildings/buildingType"
import {Game} from '../../../backend/game';

@Component({
  selector: 'building-component',
  standalone: true,
  styleUrl: './building-component.css',
  templateUrl: './building-component.html'

})

export class BuildingComponent {
  @Input() building: BuildingType;
  hovertext: string | undefined = "jo"

  constructor(protected game: Game){

  }


  public setHidden(building: BuildingType | undefined): boolean {
    this.hovertext = this.setDescription(building)

    return !(building != undefined && building.costTotal / 2 <= this.game.getGameState().allTimeBB);
  }

  public setBuyable(building: BuildingType | undefined): boolean {
    return !(building != undefined
      && building.costTotal <= this.game.getGameState().realBB);
  }

  public isSellable(building: BuildingType | undefined): boolean {
    return !(building != undefined && building.amount > 0)
  }

  private setDescription(building: BuildingType | undefined): string {

    let totalGenerated = 0
    if(building?.amount != undefined && building.effectBpS != undefined) {
      totalGenerated = building?.amount * building?.effectBpS
    }

    return <string>building?.description + "\n"
    + "1 of this building will generated " + building?.effectBpS + " bitterballen every second.\n"
    + "You currently have " + building?.amount + " of this building.\n"
    + "These generate " + totalGenerated + " bitterballen every second."
  }
}
