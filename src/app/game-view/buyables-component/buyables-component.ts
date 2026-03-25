import {Component, Input} from '@angular/core';
import {UpgradeType} from '../../backend/upgrades/upgradeType';
import {BuildingComponent} from './building-component/building-component';
import {UpgradeComponent} from './upgrade-component/upgrade-component';
import {BuildingType} from '../../backend/buildings/buildingType';

@Component({
  selector: 'buyables-component',
  standalone: true,
  styleUrl: './buyables-component.css',
  imports: [
    BuildingComponent,
    UpgradeComponent
  ],
  templateUrl: './buyables-component.html'

})

export class BuyablesComponent{
  @Input() buildings: BuildingType[]
  @Input() upgrades: UpgradeType[]

}
