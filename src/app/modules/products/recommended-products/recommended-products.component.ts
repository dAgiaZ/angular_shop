import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from '../../../models/product.model'
@Component({
  selector: 'app-recommended-products',
  templateUrl: './recommended-products.component.html',
  styleUrls: ['./recommended-products.component.css']
})
export class RecommendedProductsComponent implements OnInit {
  recommendeds: any;

  constructor(
    private productsService: ProductsService
  ) { }

  ngOnInit() {
    this.recommendeds = this.productsService.getRecommendeds();
  }

}
