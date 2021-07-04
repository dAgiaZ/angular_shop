import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container/container.component';
import { HeaderComponent } from './header/header.component';
import { CartSidebarComponent } from './cart-sidebar/cart-sidebar.component';

@NgModule({
  declarations: [ContainerComponent, HeaderComponent, CartSidebarComponent],
  imports: [
    CommonModule
  ],
  exports: [
    ContainerComponent,
    HeaderComponent,
    CartSidebarComponent
  ]
})
export class LayoutModule { }
