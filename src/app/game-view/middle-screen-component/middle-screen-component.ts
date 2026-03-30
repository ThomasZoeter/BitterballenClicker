import {Component, Input} from '@angular/core';
import {UpgradeType} from '../../backend/upgrades/upgradeType';
import {LocalStorageUser} from '../../backend/local-storage/local-storage-user';
import {StatsComponent} from './stats-screen/stats-component';

@Component({
  selector: 'middle-screen-component',
  styleUrl: './middle-screen-component.css',
  imports: [
    StatsComponent
  ],
  standalone: true,
  templateUrl: './middle-screen-component.html'

})

export class MiddleScreenComponent {
  middleScreen = 'Default'

  @Input() upgrades: UpgradeType[]
  @Input() localStorageUser: LocalStorageUser

  public clickMiddleScreen(choice: string) {
    if (choice === "Statistics") {
      this.middleScreen = "Statistics"
    } else {
      this.middleScreen = "Default"
    }
  }

}
