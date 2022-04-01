import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListingComponent } from './components/listing/listing.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { SigninComponent } from './components/signin/signin.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { LoginComponent } from './components/login/login.component';
import { CartComponent } from './components/cart/cart.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'inventory', component: InventoryComponent},
  { path: 'movies', component: ListingComponent },
  { path: 'signin/adm', component: SigninComponent },
  { path: 'signin/cli', component: SigninComponent },
  { path: 'login', component: LoginComponent },
  { path: 'movie-detail/:movie_id', component: MovieDetailComponent},
  { path: 'cart', component: CartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [InventoryComponent, ListingComponent, SigninComponent, LoginComponent, MovieDetailComponent, CartComponent];
