import {
  Component, Input, OnInit
} from '@angular/core';
import {Game} from '../../backend/game';
import {UpgradeType} from '../../backend/upgrades/upgradeType';

@Component({
  selector: 'info-component',
  standalone: true,
  styleUrl: './info-component.css',
  templateUrl: './info-component.html'

})

export class InfoComponent implements OnInit {
  @Input() upgradesBought?: UpgradeType[]
  @Input() game?: Game

  private getBoughtUpgrade(boughtUpgrades: UpgradeType[] | undefined) {
    if (boughtUpgrades != undefined) {
      return boughtUpgrades.filter(u => u.hasBeenBought)
    }
    return undefined
  }

  ngOnInit(): void {
    if (this.game != undefined) {
      this.upgradesBought = this.getBoughtUpgrade(this.upgradesBought)
    }
  }

}
