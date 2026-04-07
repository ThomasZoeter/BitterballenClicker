import {Component, Input} from '@angular/core';
import {UpgradeType} from '../../backend/upgrades/upgradeType';
import {BuildingType} from '../../backend/buildings/buildingType';
import {UpgradesBlockComponent} from './upgrades-block-component/upgrades-block-component';
import {BuildingsBlockComponent} from './buildings-block-component/buildings-block-component';

@Component({
  selector: 'buyables-component',
  standalone: true,
  styleUrl: './buyables-component.css',
  imports: [
    UpgradesBlockComponent,
    BuildingsBlockComponent,
  ],
  templateUrl: './buyables-component.html'

})

export class BuyablesComponent{
  @Input() buildings: BuildingType[]
  @Input() upgrades: UpgradeType[]

}
