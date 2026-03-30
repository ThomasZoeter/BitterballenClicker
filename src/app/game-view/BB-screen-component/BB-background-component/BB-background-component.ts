import {
  Component
} from '@angular/core';
import {BBRainComponent} from './BB-rain-component/BB-rain-component';

@Component({
  selector: 'BB-background-component',
  standalone: true,
  styleUrl: './BB-background-component.css',
  imports: [
    BBRainComponent
  ],
  templateUrl: './BB-background-component.html'

})

export class BBBackgroundComponent {
}
