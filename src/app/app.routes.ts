import { Routes } from '@angular/router';
import { CardListComponent } from './features/card-list/card-list.component';

export const routes: Routes = [
  { path: '', component: CardListComponent },
  {
    path: 'disclaimer',
    loadComponent() {
      return import('./features/disclaimer/disclaimer.component').then((m) => m.DisclaimerComponent);
    },
  },
];
