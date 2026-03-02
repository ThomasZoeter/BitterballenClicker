import {Component, Input} from '@angular/core';
import {Game} from '../../backend/game';
import {UpgradeType} from '../../backend/upgradeType';
import {BuildingType} from '../../backend/buildingType';

@Component({
  selector: 'upgrade-component',
  standalone: true,
  styleUrl: './upgrade-component.css',
  templateUrl: './upgrade-component.html'

})

export class UpgradeComponent {
  @Input() upgrade?: UpgradeType
  @Input() game?: Game;

  public setHidden(upgrade: UpgradeType | undefined): boolean {
    return !(upgrade != undefined &&
      this.game !== undefined && !upgrade.hasBeenBought && upgrade.cost / 2 <= this.game.getGameState().allTimeBB);
  }

  public setBuyable(upgrade: UpgradeType | undefined): boolean {
    return !(upgrade != undefined && this.game !== undefined && upgrade.cost <= this.game.getGameState().realBB);
  }
}
