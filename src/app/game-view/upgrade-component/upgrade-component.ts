import {Component, Input} from '@angular/core';
import {Game} from '../../backend/game';
import {UpgradeType} from '../../backend/upgrades/upgradeType';

@Component({
  selector: 'upgrade-component',
  standalone: true,
  styleUrl: './upgrade-component.css',
  templateUrl: './upgrade-component.html'

})

export class UpgradeComponent {
  @Input() upgrade?: UpgradeType
  @Input() game?: Game;
  hovertext = ""

  public setHidden(upgrade: UpgradeType | undefined): boolean {
    if(upgrade != undefined) {
      this.hovertext = this.setDescription(upgrade)
    }
    return !(upgrade != undefined &&
      this.game !== undefined && !upgrade.hasBeenBought && upgrade.cost / 2 <= this.game.getGameState().allTimeBB);
  }

  public setBuyable(upgrade: UpgradeType | undefined): boolean {
    return !(upgrade != undefined && this.game !== undefined && upgrade.cost <= this.game.getGameState().realBB);
  }

  private setDescription(upgrade: UpgradeType | undefined): string {
    let effectText = ""
    if ( upgrade?.effectOnBuilding !== "") {
      effectText = "This upgrade doubles the power of the " + upgrade?.effectOnBuilding + "."
    }
    if(upgrade?.effectOnBaseClicker !== 0) {
      effectText = "This upgrade increases the base clicking power by " + upgrade?.effectOnBaseClicker + "."
    }
    if(upgrade?.effectOnModClicker !== 0 && upgrade?.effectOnModClicker !== undefined) {
      effectText = "This upgrade increases the clicking power by " + upgrade?.effectOnModClicker / 100 + " percent."
    }
    if(upgrade?.effectOnModBps !== 0 && upgrade?.effectOnModBps !== undefined) {
      effectText = "This upgrade increases BpS by " + upgrade?.effectOnModBps + " percent."
    }
    return  <string>upgrade?.description + "\n"
    + "Cost: " + upgrade?.cost + "\n"
    + "Effect: " + effectText

  }
}
