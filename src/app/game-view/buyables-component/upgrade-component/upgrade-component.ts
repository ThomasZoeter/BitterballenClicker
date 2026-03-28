import {Component, Input, OnInit} from '@angular/core';
import {Game} from '../../../backend/game';
import {UpgradeType} from '../../../backend/upgrades/upgradeType';

@Component({
  selector: 'upgrade-component',
  standalone: true,
  styleUrl: './upgrade-component.css',
  templateUrl: './upgrade-component.html'

})

export class UpgradeComponent implements OnInit {
  @Input() upgrade: UpgradeType
  hovertext = ""

  constructor(protected game: Game) {
  }

  public setHidden(upgrade: UpgradeType): boolean {
    return !(upgrade != undefined &&
      this.game !== undefined && !upgrade.hasBeenBought && upgrade.cost / 2 <= this.game.getGameState().allTimeBB);
  }

  public setBuyable(upgrade: UpgradeType): boolean {
    return !(upgrade != undefined && upgrade.cost <= this.game.getGameState().realBB);
  }

  private setDescription(upgrade: UpgradeType): string {
    let effectText = ""
    if (upgrade.effectOnBuilding !== "") {
      effectText = "This upgrade doubles the power of the " + upgrade.effectOnBuilding + "."
    }
    if (upgrade.effectOnBaseClicker !== 0) {
      effectText = "This upgrade increases the base clicking power by " + upgrade.effectOnBaseClicker + "."
    }
    if (upgrade.effectOnModClicker !== 0 && upgrade.effectOnModClicker !== undefined) {
      effectText = "This upgrade increases the clicking power by " + upgrade.effectOnModClicker / 100 + " percent."
    }
    if (upgrade.effectOnModBps !== 0 && upgrade.effectOnModBps !== undefined) {
      effectText = "This upgrade increases BpS by " + upgrade.effectOnModBps + " percent."
    }
    return <string>upgrade.description + "\n"
      + "Cost: " + upgrade.cost + "\n"
      + "Effect: " + effectText

  }

  ngOnInit(): void {
    this.hovertext = this.setDescription(this.upgrade)
    // On init, if an upgrade has been bought then the effect should be applied
    if(this.upgrade.hasBeenBought) {
      console.log(this.upgrade.name + " has been bought!")
      this.game.applyUpgradeEffect(this.upgrade)
    }
  }
}
