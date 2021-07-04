import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart as CartModel } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})

export class Cart {
  private readonly _cartState: any = new BehaviorSubject<any>({});
  readonly cartState$ = this._cartState.asObservable();
  private readonly _totalQuantity: any = new BehaviorSubject<number>(0);
  readonly totalQuantity$ = this._totalQuantity.asObservable();

  constructor(){
    this.cartState$.subscribe( (cart: CartModel) => {
      this._totalQuantity.next(cart.products ? cart.products.length : 0);
    });
  }

  public get cartState(): CartModel {
    return this._cartState.getValue();
  }

  public set cartState(val: CartModel) {
    this._cartState.next(val);
  }

  public get totalQuantity(): number {
    return this._totalQuantity.getValue();
  }
}
