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


}
