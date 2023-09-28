import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharactersListComponent } from './components/characters-list/characters-list.component';

const routes: Routes = [
  {path: 'home', component: CharactersListComponent},
  {path: 'character/:id', loadChildren: () => import('./components/character/character.module').then(m => m.CharacterModule) },
  {path: 'location/:id', loadChildren: () => import('./components/location/location.module').then(m => m.LocationModule) },
  {path: 'episode/:id', loadChildren: () => import('./episode/episode.module').then(m => m.EpisodeModule) },
  {path: '', redirectTo:'/home', pathMatch:'full'},
  {path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
