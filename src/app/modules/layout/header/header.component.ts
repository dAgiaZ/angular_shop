import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/store/cart.store';
import { Cart as CartModel} from '../../../models/cart.model'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private cartService: CartService,
    public cartStore: Cart
  ) { }

  ngOnInit() {
    this.cartService.getCart(5).subscribe( (cart: CartModel) => {
      this.cartStore.cartState = cart
    })
  }

}
