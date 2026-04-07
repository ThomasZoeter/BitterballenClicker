import {Component, Input} from '@angular/core';
import {UpgradeType} from '../../backend/upgrades/upgradeType';
import {BuildingComponent} from './buildings-block-component/building-component/building-component';
import {UpgradeComponent} from './upgrades-block-component/upgrade-component/upgrade-component';
import {BuildingType} from '../../backend/buildings/buildingType';
import {NgOptimizedImage} from '@angular/common';
import {UpgradesBlockComponent} from './upgrades-block-component/upgrades-block-component';
import {BuildingsBlockComponent} from './buildings-block-component/buildings-block-component';

@Component({
  selector: 'buyables-component',
  standalone: true,
  styleUrl: './buyables-component.css',
  imports: [
    BuildingComponent,
    UpgradeComponent,
    NgOptimizedImage,
    UpgradesBlockComponent,
    BuildingsBlockComponent,
  ],
  templateUrl: './buyables-component.html'

})

export class BuyablesComponent{
  @Input() buildings: BuildingType[]
  @Input() upgrades: UpgradeType[]

}
