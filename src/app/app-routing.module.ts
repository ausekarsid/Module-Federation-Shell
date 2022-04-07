import { loadRemoteModule } from '@angular-architects/module-federation';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

const URL = 'http://localhost:3000/remoteEntry.js';
// const linkaiURL = 'http://localhost:4200/clientselection.js';
const digitalaiURL = 'http://localhost:4300/remoteEntry.js';

export const APP_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },

  // Your route here:

  {
    path: 'travel',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: URL,
        exposedModule: './Module',
      }).then((m) => m.TravelModule),
  },

  {
    path: '**',
    component: NotFoundComponent,
  },
];
