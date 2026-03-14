import {
  Component, Input, OnInit
} from '@angular/core';
import {Game} from '../../backend/game';
import {UpgradeType} from '../../backend/upgrades/upgradeType';

@Component({
  selector: 'stats-component',
  standalone: true,
  styleUrl: './stats-component.css',
  templateUrl: './stats-component.html'

})

export class StatsComponent implements OnInit {
  @Input() upgradesBought: UpgradeType[]

  constructor(protected game: Game){
  }

  ngOnInit(): void {
      this.upgradesBought = this.upgradesBought.filter(u => u.hasBeenBought)
  }

}
