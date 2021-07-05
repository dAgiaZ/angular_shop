import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './modules/layout/layout.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastsContainerComponent } from './services/toasts/toasts-container.component';
import { ProductFormComponent } from './modules/products/products-manager/forms/product-form/product-form.component';
import { DeleteProductFormComponent } from './modules/products/products-manager/forms/delete-product-form/delete-product-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ToastsContainerComponent,
    ProductFormComponent,
    DeleteProductFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  entryComponents: [ProductFormComponent, DeleteProductFormComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
