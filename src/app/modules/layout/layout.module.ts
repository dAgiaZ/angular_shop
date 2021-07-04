import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container/container.component';
import { HeaderComponent } from './header/header.component';
import { CartSidebarComponent } from './cart-sidebar/cart-sidebar.component';
import { RouterModule } from '@angular/router';
import { CartsModule } from '../carts/carts.module';

@NgModule({
  declarations: [ContainerComponent, HeaderComponent, CartSidebarComponent],
  imports: [
    CommonModule,
    RouterModule,
    CartsModule
  ],
  exports: [
    ContainerComponent,
    HeaderComponent,
    CartSidebarComponent
  ]
})
export class LayoutModule { }
