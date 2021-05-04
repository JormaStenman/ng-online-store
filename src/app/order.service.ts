import {Injectable} from '@angular/core';
import {Order, OrderStatus} from './Order.model';
import {v4 as uuid} from 'uuid';
import {StoreService} from './store.service';

const storage = window.localStorage;
// noinspection SpellCheckingInspection
const key = 'me.stenman.orders';

function loadOrders(): Array<Order> {
  const item = storage.getItem(key);
  return item ? JSON.parse(item) : [];
}

function storeOrders(orders: Array<Order>): void {
  storage.setItem(key, JSON.stringify(orders));
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private storeService: StoreService,
  ) {
  }

  getOrders(): Array<Order> {
    return loadOrders();
  }

  addOrder(order: Order): Order {
    const orders = loadOrders();
    const newOrder = {
      ...order,
      date: new Date(),
      id: uuid(),
      status: OrderStatus.ordered
    };
    newOrder.items.forEach(lineItem => {
      if (!this.storeService.sellProduct(lineItem.productId, lineItem.quantity)) {
        newOrder.status = OrderStatus.waitingForProducts;
      }
    });
    orders.push(newOrder);
    storeOrders(orders);
    return newOrder;
  }

  getOrderById(orderId: string): Order | undefined {
    const order = loadOrders().find(o => o.id === orderId);
    return order ? {...order} : undefined;
  }

  cancelOrder(orderId: string): void {
    const orders = loadOrders();
    const index = orders.findIndex(order => order.id === orderId);
    if (index >= 0) {
      orders[index].items.forEach(lineItem => {
        this.storeService.returnProduct(lineItem.productId, lineItem.quantity);
      });
      orders.splice(index, 1);
      storeOrders(orders);
    }
  }
}
