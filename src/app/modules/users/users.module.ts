import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersMenuComponent } from './users-menu/users-menu.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [UsersMenuComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [UsersMenuComponent]
})
export class UsersModule { }
