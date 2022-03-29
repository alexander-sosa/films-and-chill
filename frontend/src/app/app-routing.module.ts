import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListingComponent } from './components/listing/listing.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { SigninComponent } from './components/signin/signin.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/movies', pathMatch: 'full' },
  { path: 'inventory', component: InventoryComponent},
  { path: 'movies', component: ListingComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'movie-detail/:movie_id', component: MovieDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [InventoryComponent, ListingComponent, SigninComponent];
