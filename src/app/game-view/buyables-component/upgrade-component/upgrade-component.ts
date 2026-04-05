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

  public setHidden(): boolean {
    return !(this.upgrade != undefined &&
      this.game !== undefined && !this.upgrade.hasBeenBought && this.upgrade.cost / 2 <= this.game.getGameState().allTimeBB);
  }

  public setBuyable(): boolean {
    return !(this.upgrade != undefined && this.upgrade.cost <= this.game.getGameState().realBB);
  }

  private setDescription(): string {
    let effectText = ""
    if (this.upgrade.effectOnBuilding !== "") {
      effectText = "This upgrade doubles the power of the " + this.upgrade.effectOnBuilding + "."
    }
    if (this.upgrade.effectOnBaseClicker !== 0) {
      effectText = "This upgrade increases the base clicking power by " + this.upgrade.effectOnBaseClicker + "."
    }
    if (this.upgrade.effectOnModClicker !== 0 && this.upgrade.effectOnModClicker !== undefined) {
      effectText = "This upgrade increases the clicking power by " + this.upgrade.effectOnModClicker / 100 + " percent."
    }
    if (this.upgrade.effectOnModBps !== 0 && this.upgrade.effectOnModBps !== undefined) {
      effectText = "This upgrade increases BpS by " + this.upgrade.effectOnModBps + " percent."
    }
    return <string>this.upgrade.description + "\n"
      + "Cost: " + this.upgrade.cost + "\n"
      + "Effect: " + effectText

  }

  ngOnInit(): void {
    this.hovertext = this.setDescription()
    // On init, if an upgrade has been bought then the effect should be applied
    if(this.upgrade.hasBeenBought) {
      console.log(this.upgrade.name + " has been bought!")
      this.game.applyUpgradeEffect(this.upgrade)
    }
  }
}
