import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toasts/toasts.service';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/store/cart.store';
import { Cart as CartModel, Product } from '../../../models/index';
import { Authorization } from 'src/app/store/authorization.store';

@Component({
  selector: 'app-product-container',
  templateUrl: './product-container.component.html',
  styleUrls: ['./product-container.component.css']
})
export class ProductContainerComponent implements OnInit {
  @Input() product: any;
  addToCartForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private cartStore: Cart,
    private cartService: CartService,
    private toastService: ToastService,
    public authState: Authorization
  ) { }

  ngOnInit() {
    this.addToCartForm = this.formBuilder.group({
      id: [this.product.id, Validators.required],
      quantity: [1, Validators.required]
    });
  }

  addToCart(): void {
    let products: CartModel['products'] = [...this.cartStore.cartState.products];
    const updatedProducts: CartModel['products'] = this.recalcCart(products, this.addToCartForm.value);
    this.cartService.updateCart(5, { products: updatedProducts }).subscribe( cart => {
      this.cartStore.cartState = cart;
      this.toastService.showSuccess('Product successfully added to cart.', { delay: 5000 });
    }, 
    () => {
      this.toastService.showError('Error while trying to add product to cart.', { delay: 5000 });
    });
  }

  private recalcCart(products: CartModel['products'], newProduct: CartModel['products'][0]): CartModel['products'] {
    let updated: boolean = false;
    let updatedProducts: CartModel['products'] = products.map( (product: CartModel['products'][0]) => {
      if (product.id === newProduct.id) {
        product.quantity += newProduct.quantity;
        updated = true;
        return {id: product.id, quantity: product.quantity};
      } else {
        return {id: product.id, quantity: product.quantity};
      }
    });
    if (!updated) {
      updatedProducts.push(newProduct);
    }
    return updatedProducts;
  }
}
