import {Component, Input} from '@angular/core';
import {UpgradeType} from '../../../backend/upgrades/upgradeType';
import {UpgradeComponent} from './upgrade-component/upgrade-component';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'upgrades-block-component',
  standalone: true,
  styleUrl: './upgrades-block-component.css',
  imports: [
    UpgradeComponent,
    NgOptimizedImage,
  ],
  templateUrl: './upgrades-block-component.html'

})

export class UpgradesBlockComponent {
  @Input() upgrades: UpgradeType[]

}
