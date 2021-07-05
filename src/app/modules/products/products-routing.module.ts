import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from 'src/app/guards/admin.guard';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsManagerComponent } from './products-manager/products-manager.component';


const routes: Routes = [
  { path: '', component: ProductsListComponent },
  { path: 'manager', component: ProductsManagerComponent, canActivate: [AdminGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
