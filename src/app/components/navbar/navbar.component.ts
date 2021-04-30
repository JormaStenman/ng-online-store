import {Component, DoCheck, OnInit} from '@angular/core';
import {CartService} from '../../cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, DoCheck {
  itemsInCart = 0;

  constructor(
    private cartService: CartService,
  ) {
  }

  ngOnInit(): void {
    this.refreshCart();
  }

  ngDoCheck(): void {
    this.refreshCart();
  }

  refreshCart(): void {
    this.itemsInCart = this.cartService.numItems();
  }
}
