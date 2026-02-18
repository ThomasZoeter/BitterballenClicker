import { Routes } from '@angular/router';
import {Game} from './game-view/game-view'

export const routes: Routes = [
  { path: '', redirectTo: '/game', pathMatch: 'full'},
  { path: 'game', component: Game },
];