import {
  Component, Input
} from '@angular/core';
import {BuildingType} from "../../backend/buildingType"
import {Game} from '../../backend/game';

@Component({
  selector: 'building-component',
  standalone: true,
  styleUrl: './building-component.css',
  templateUrl: './building-component.html'

})

export class BuildingComponent {
  @Input() building?: BuildingType;
  @Input() game?: Game;

  public setHidden(building: BuildingType | undefined): boolean {
    return !(building != undefined && this.game !== undefined && building.cost / 2 <= this.game.getGameState().allTimeBB);
  }

  public setBuyable(building: BuildingType | undefined): boolean {
    return !(building != undefined && this.game !== undefined && building.cost <= this.game.getGameState().realBB);
  }

  public isSellable(building: BuildingType | undefined): boolean {
    return !(building != undefined && building.amount > 0)
  }
}
