import {
  Component, Input, OnInit
} from '@angular/core';
import {Game} from '../../backend/game';
import {UpgradeType} from '../../backend/upgrades/upgradeType';
import {LocalStorageUser} from '../../backend/local-storage/local-storage-user';

@Component({
  selector: 'stats-component',
  standalone: true,
  styleUrl: './stats-component.css',
  templateUrl: './stats-component.html'

})

export class StatsComponent implements OnInit {
  @Input() upgradesBought: UpgradeType[]
  @Input() localStorageUser: LocalStorageUser

  constructor(protected game: Game){
  }

  ngOnInit(): void {
      this.upgradesBought = this.upgradesBought.filter(u => u.hasBeenBought)
  }

}
