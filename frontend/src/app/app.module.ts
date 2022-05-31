import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListingComponent } from './components/listing/listing.component';
import { SigninComponent } from './components/signin/signin.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { CartComponent } from './components/cart/cart.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { GenreListingComponent } from './components/genre-listing/genre-listing.component';
import { MovieGenreComponent } from './components/movie-genre/movie-genre.component';
import { UseProfileComponent } from './components/use-profile/use-profile.component';
import { PasswordEditComponent } from './components/password-edit/password-edit.component';
import { MoviePremieresComponent } from './components/movie-premieres/movie-premieres.component';
import { MovieSearchComponent } from './components/movie-search/movie-search.component';
import { MoviePopularComponent } from './components/movie-popular/movie-popular.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { ChartsTestComponent } from './components/charts-test/charts-test.component';
import { NgChartsModule } from 'ng2-charts';
import { MovieAnalyticsComponent } from './components/movie-analytics/movie-analytics.component';
import { UserAnalyticsComponent } from './components/user-analytics/user-analytics.component';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    ListingComponent,
    SigninComponent,
    MovieDetailComponent,
    LoginComponent,
    CartComponent,
    NavbarComponent,
    GenreListingComponent,
    MovieGenreComponent,
    UseProfileComponent,
    PasswordEditComponent,
    MoviePremieresComponent,
    MovieSearchComponent,
    MoviePopularComponent,
    ChartsTestComponent,
    MovieAnalyticsComponent,
    UserAnalyticsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    IvyCarouselModule,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
