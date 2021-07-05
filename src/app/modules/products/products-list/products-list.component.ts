import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  products: Product[];
  private productsSubscriber$: any;
  totalCount: number;
  page: number = 1;
  globalSearch: string;
  
  constructor(private readonly productsService: ProductsService) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(page: number = 1, extraParams?: any): void{
    let params = {
      _page: page,
      _limit: 6,
      ...extraParams
    };
    if (this.globalSearch) {
      params.q = this.globalSearch;
    }
    this.productsSubscriber$ = this.productsService.getProducts(params).subscribe( response => {
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
    this.productsSubscriber$.unsubscribe();
  }
}
