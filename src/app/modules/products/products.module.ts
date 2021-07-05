import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductContainerComponent } from './product-container/product-container.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsManagerComponent } from './products-manager/products-manager.component';

@NgModule({
  declarations: [ProductsListComponent, ProductContainerComponent, ProductsManagerComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    NgbPaginationModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProductsModule { }
