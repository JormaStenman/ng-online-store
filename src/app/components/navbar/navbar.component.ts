import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {CartService} from '../../cart.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  get itemsInCart(): number {
    return CartService.countItems(this.cart);
  }

  private cart: any;
  private cartSub: Subscription | undefined;

  constructor(
    private cartService: CartService,
  ) {
  }

  ngOnInit(): void {
    [this.cart, this.cartSub] = this.cartService.addSubscription(cart => this.cart = cart);
  }

  ngOnDestroy(): void {
    if (this.cartSub) {
      this.cartSub.unsubscribe();
    }
  }

}
