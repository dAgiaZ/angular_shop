import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container/container.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { CartsModule } from '../carts/carts.module';
import { UsersModule } from '../users/users.module';

@NgModule({
  declarations: [ContainerComponent, HeaderComponent, SidebarComponent],
  imports: [
    CommonModule,
    RouterModule,
    CartsModule,
    UsersModule
  ],
  exports: [
    ContainerComponent,
    HeaderComponent,
    SidebarComponent
  ]
})
export class LayoutModule { }
