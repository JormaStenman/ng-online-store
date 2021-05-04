import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartService} from '../../cart.service';
import {Subscription} from 'rxjs';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  get itemsInCart(): number {
    return CartService.countItems(this.cart);
  }

  activeLink = '';
  private cart: any;
  private routeSub: Subscription | undefined;
  private cartSub: Subscription | undefined;

  constructor(
    private cartService: CartService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    [this.cart, this.cartSub] = this.cartService.addSubscription(cart => this.cart = cart);
    this.routeSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.activeLink = (event as NavigationEnd).url;
      }
    });
  }

  ngOnDestroy(): void {
    [this.cartSub, this.routeSub].forEach(sub => {
      if (sub) {
        sub.unsubscribe();
      }
    });
  }

}
