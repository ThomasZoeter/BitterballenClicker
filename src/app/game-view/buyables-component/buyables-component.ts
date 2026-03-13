import {Component, Input, OnInit} from '@angular/core';
import {Game} from '../../backend/game';
import {UpgradeType} from '../../backend/upgrades/upgradeType';
import {BuildingComponent} from '../building-component/building-component';
import {UpgradeComponent} from '../upgrade-component/upgrade-component';
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

export class BuyablesComponent implements OnInit {
  @Input() game?: Game
  @Input() buildings?: BuildingType[]
  @Input() upgrades?: UpgradeType[]

  ngOnInit(): void {
  }

}
