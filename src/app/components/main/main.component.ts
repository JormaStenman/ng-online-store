import {Component} from '@angular/core';
import {OrderService} from '../../order.service';
import {StoreService} from '../../store.service';
import {CartService} from '../../cart.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  constructor(
    private orderService: OrderService,
    private storeService: StoreService,
    private cartService: CartService,
  ) {
  }

  clearStorage(): void {
    this.orderService.clearOrders();
    this.storeService.clearProducts();
    this.cartService.clearCart();
  }

  disabled(): boolean {
    return !this.orderService.hasStorage() && !this.storeService.hasStorage() && !this.cartService.hasStorage();
  }
}
