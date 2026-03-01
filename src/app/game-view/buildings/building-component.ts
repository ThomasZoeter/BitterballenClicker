import {
  Component, Input
} from '@angular/core';
import {BuildingType} from "../../backend/buildingType"
import {Game} from '../../backend/game';

@Component({
  selector: 'building-component',
  standalone: true,
  styleUrl: './building.css',
  templateUrl: './building.html'

})

export class BuildingComponent {
  @Input() building?: BuildingType;
  @Input() game?: Game;


}
