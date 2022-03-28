import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListingComponent } from './components/listing/listing.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { SigninComponent } from './components/signin/signin.component';

const routes: Routes = [
  { path: '', redirectTo: '/movies', pathMatch: 'full' },
  { path: 'inventory', component: InventoryComponent}, 
  { path: 'movies', component: ListingComponent },
  { path: 'signin', component: SigninComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [InventoryComponent, ListingComponent, SigninComponent];