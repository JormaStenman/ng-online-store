import {Injectable} from '@angular/core';

const storage = window.localStorage;
// noinspection SpellCheckingInspection
const key = 'me.stenman.orders';

export interface LineItem {
  productId: number;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  date: Date;
  items: Array<LineItem>;
}

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

  addOrder(order: Order): void {
    const orders = loadOrders();
    orders.push(order);
    storeOrders(orders);
  }
}
