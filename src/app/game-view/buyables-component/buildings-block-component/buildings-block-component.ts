import {Component, Input} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {BuildingType} from '../../../backend/buildings/buildingType';
import {BuildingComponent} from './building-component/building-component';

@Component({
  selector: 'buildings-block-component',
  standalone: true,
  styleUrl: './buildings-block-component.css',
  imports: [
    NgOptimizedImage,
    BuildingComponent,
  ],
  templateUrl: './buildings-block-component.html'

})

export class BuildingsBlockComponent {
  @Input() buildings: BuildingType[]

}
