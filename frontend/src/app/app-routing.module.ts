import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListingComponent } from './components/listing/listing.component';
import { InventoryComponent } from './inventory/inventory.component';

const routes: Routes = [
  { path: 'inventory', component: InventoryComponent}, 
  { path: 'movies', component: ListingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [InventoryComponent];