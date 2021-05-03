import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../order.service';
import {Order} from '../../Order.model';
import {StoreService} from '../../store.service';
import {truncate} from 'lodash-es';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Array<Order> = [];
  displayedColumns = ['date', 'status', 'id', 'contents'];

  constructor(
    private orderService: OrderService,
    private storeService: StoreService,
  ) {
  }

  ngOnInit(): void {
    this.orders = this.orderService.getOrders();
  }

  orderContents(order: Order): string {
    return order.items
      .map(lineItem => this.storeService.getProductById(lineItem.productId))
      .filter(product => product)
      .map(product => truncate(product?.name, {length: 20}))
      .join(', ');
  }
}
