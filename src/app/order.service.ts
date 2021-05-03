import {Injectable} from '@angular/core';
import {Order} from './Order.model';
import {v4 as uuid} from 'uuid';

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

  getOrders(): Array<Order> {
    return loadOrders();
  }

  addOrder(order: Order): Order {
    const orders = loadOrders();
    orders.push(order = {...order, date: new Date(), id: uuid()});
    storeOrders(orders);
    return order;
  }
}
