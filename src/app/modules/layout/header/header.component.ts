import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Authorization } from 'src/app/store/authorization.store';
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
    public cartStore: Cart,
    public authStore: Authorization
  ) { }

  ngOnInit() {
    this.authStore.currentUser$.subscribe( () => {
      if (this.authStore.currentUser) {
        this.cartService.getCart(this.authStore.currentUser.id).subscribe( (cart: CartModel) => {
          this.cartStore.cartState = cart;
        })
      }
    })
  }

}
