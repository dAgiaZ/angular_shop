import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Cart } from 'src/app/store/cart.store';
import { CartService } from 'src/app/services/cart.service';
import { ToastService } from '../../../services/toasts/toasts.service';
import { Cart as CartModel, Product} from '../../../models/index'
import { Observer, Subscriber } from 'rxjs';

interface DetailedProductCart extends Product {
  quantity?: number
}

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  cartProducts: DetailedProductCart[];
  total: number = 0;
  private cart: CartModel;
  private cartSubscriber$: Subscriber<CartModel>;

  constructor(
    private cartStore: Cart,
    private productsService: ProductsService,
    private cartService: CartService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.cartSubscriber$ = this.cartStore.cartState$.subscribe( async (cart: CartModel) => {
      if (cart.products && cart.products.length >= 0) {
        this.cart = cart;
        await this.updateCartList(cart);
      }
    });
  }

  private async updateCartList(cart: CartModel) {
    if (cart.products.length) {
      const ids: Array<string> = cart.products.map( (product: CartModel['products'][0]) => `id=${product.id}`)
      const params: string = ids.join('&');
      const productsDetails: Product[] = await this.productsService.getProducts(params).toPromise()
      this.cartProducts = productsDetails.map( (product: DetailedProductCart ) => {
        let cartProduct: CartModel['products'][0] = cart.products.find( (cartProduct: CartModel['products'][0]) => cartProduct.id === product.id);
        if (cartProduct) {
          product.quantity = cartProduct.quantity;
        }
        return product
      });
    } else {
      this.cartProducts = [];
    }

    this.total = this.cartProducts.reduce( (total: number, product: DetailedProductCart) => total + (product.quantity * product.price), 0);
  }

  updateProductOnCart(event): void {
    this.cart.products = this.cart.products.map( (product: CartModel['products'][0]) => {
      if (product.id == event.target.id) {
        product.quantity = parseInt(event.target.value);
      }
      return product;
    })
    this.updateCart()
  }

  removeProductFromCart(productId: number): void {
    this.cart.products = this.cart.products.filter( (product: CartModel['products'][0]) => product.id != productId);
    this.updateCart();
  }

  emptyCart(): void {
    this.cart.products = [];
    this.updateCart();
  }

  private updateCart(): void {
    this.cartService.updateCart(this.cart.id, this.cart).subscribe( (cart: CartModel) => {
      this.cartStore.cartState = cart;
      this.toastService.showSuccess('Cart updated.', { delay: 5000 });
    },
    () => {
      this.toastService.showError('Error while trying to update cart.', { delay: 5000 });
    });
  }

  ngOnDestroy() {
    this.cartSubscriber$.unsubscribe();
  }
}
