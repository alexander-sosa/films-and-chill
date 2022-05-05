import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListingComponent } from './components/listing/listing.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { SigninComponent } from './components/signin/signin.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { LoginComponent } from './components/login/login.component';
import { CartComponent } from './components/cart/cart.component';
import { GenreListingComponent } from './components/genre-listing/genre-listing.component';
import { MovieGenreComponent } from './components/movie-genre/movie-genre.component';
import { UseProfileComponent } from './components/use-profile/use-profile.component';
import { PasswordEditComponent } from './components/password-edit/password-edit.component';
import { MoviePremieresComponent } from './components/movie-premieres/movie-premieres.component';
import { MovieSearchComponent } from './components/movie-search/movie-search.component';


  const routes: Routes = [
    { path: '', redirectTo: '/movies', pathMatch: 'full' },
    { path: 'inventory', component: InventoryComponent},
    { path: 'movies', component: ListingComponent },
    { path: 'signin/adm', component: SigninComponent },
    { path: 'signin/cli', component: SigninComponent },
    { path: 'login', component: LoginComponent },
    { path: 'movie-detail/:movie_id', component: MovieDetailComponent },
    { path: 'cart', component: CartComponent },
    { path: 'genres', component: GenreListingComponent},
    { path: 'movies-genre/:genre_id', component: MovieGenreComponent },
    { path: 'user-profile', component: UseProfileComponent },
    { path: 'password-edit', component: PasswordEditComponent },
    { path: 'premieres', component: MoviePremieresComponent },
    { path: 'movie-search/:title', component: MovieSearchComponent }
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  export const routingComponents = [
    InventoryComponent, 
    ListingComponent, 
    SigninComponent, 
    LoginComponent, 
    MovieDetailComponent, 
    CartComponent, 
    MovieGenreComponent, 
    UseProfileComponent, 
    PasswordEditComponent,
    MoviePremieresComponent,
    MovieSearchComponent
  ];
