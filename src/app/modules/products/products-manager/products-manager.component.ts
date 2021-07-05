import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from '../../../models/product.model';
import { ProductFormComponent } from './forms/product-form/product-form.component';
@Component({
  selector: 'app-products-manager',
  templateUrl: './products-manager.component.html',
  styleUrls: ['./products-manager.component.css']
})
export class ProductsManagerComponent implements OnInit  {
  products: Product[];
  private productsSubscriber: any;
  totalCount: number;
  page: number = 1;
  globalSearch: string;
  
  constructor(
    private readonly productsService: ProductsService,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(page: number = 1, extraParams?: any): void{
    let params = {
      _page: page,
      _limit: 10,
      ...extraParams
    };
    if (this.globalSearch) {
      params.q = this.globalSearch;
    }
    this.productsSubscriber = this.productsService.getProducts(params).subscribe( response => {
      this.totalCount = response.headers.get('X-Total-Count');
      this.products = response.body;
    });
  }

  changePage(page: number): void {
    this.getProducts(page);
  }

  doGlobalSearch(query: string): void {
    this.globalSearch = query;
    if (this.globalSearch.length >= 2) {
      this.getProducts();
    }
  }

  ngOnDestroy() {
    this.productsSubscriber.unsubscribe();
  }

  openModal(product, operation) {
    const data = { operation, ...product};
    const modalRef: any = this.modalService.open(ProductFormComponent);
    modalRef.componentInstance.data = data;
    modalRef.result.then((result: boolean) => {
      if (result) {
        this.getProducts();
      }
    })
  }

}
