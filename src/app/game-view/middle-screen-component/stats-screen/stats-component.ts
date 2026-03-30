import {
  Component, Input, OnDestroy, OnInit, signal
} from '@angular/core';
import {Game} from '../../../backend/game';
import {UpgradeType} from '../../../backend/upgrades/upgradeType';
import {LocalStorageUser} from '../../../backend/local-storage/local-storage-user';
import {interval, Subscription} from 'rxjs';

@Component({
  selector: 'stats-component',
  standalone: true,
  styleUrl: './stats-component.css',
  templateUrl: './stats-component.html'

})

export class StatsComponent implements OnInit, OnDestroy {
  @Input() upgradesBought: UpgradeType[]
  @Input() localStorageUser: LocalStorageUser

  allTimeBBSig = signal(0)

  private timerSubscription: Subscription | undefined;

  constructor(protected game: Game) {
  }

  ngOnInit(): void {
    this.upgradesBought = this.upgradesBought.filter(u => u.hasBeenBought)
    this.allTimeBBSig.update(() => this.game.getGameState().allTimeBB)
    //Update statistics every 3 seconds
    this.timerSubscription = interval(3000).subscribe(() => {
      this.allTimeBBSig.update(() => this.game.getGameState().allTimeBB)
    });

  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks when the component is destroyed
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

}
