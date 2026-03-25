import {
  Component, Input, OnInit
} from '@angular/core';
import {BuildingType} from "../../../backend/buildings/buildingType"
import {Game} from '../../../backend/game';
import {BBComponent} from './BB-component/BB-component';
import {ParticlesConfig} from './particles-config';

declare var particlesJS: any


@Component({
  selector: 'BB-background-component',
  standalone: true,
  styleUrl: './BB-background-component.css',
  imports: [
    BBComponent
  ],
  templateUrl: './BB-background-component.html'

})

export class BBBackgroundComponent implements OnInit {
  ngOnInit(): void {
    this.invokeParticles()
  }

  public invokeParticles(): void {
    particlesJS('particles-js', ParticlesConfig, function () {
    });
  }

}
