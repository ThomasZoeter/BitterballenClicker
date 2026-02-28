import {Input} from '@angular/core';
import {GameState} from './game-state';

export type BuildingType =
  {
    name: string
    description: string;
    cost: number
    effectBpS: number
    amount: number
    hidden: boolean
  }
