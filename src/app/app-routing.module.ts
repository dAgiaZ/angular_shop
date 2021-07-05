import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: '/products/recommendeds', pathMatch: 'full'},
  { path: 'products', loadChildren: './modules/products/products.module#ProductsModule' },
  { path: 'auth', loadChildren: './modules/authorization/authorization.module#AuthorizationModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
