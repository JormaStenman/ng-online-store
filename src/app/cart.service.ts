import {Injectable} from '@angular/core';

const storage = window.sessionStorage;

const key = 'me.stenman.cart';

function loadCart(): any {
  return JSON.parse(storage.getItem(key) || '{}');
}

function saveCart(cart: any): void {
  storage.setItem(key, JSON.stringify(cart));
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  numItems(): number {
    const cart = loadCart();
    return Object.values(cart)
      .map(val => val as number)
      .reduce((acc, val) => acc + val, 0);
  }

  addOne(productId: number): void {
    const cart = loadCart();
    cart[productId] ||= 0;
    cart[productId]++;
    saveCart(cart);
  }

  removeOne(productId: number): void {
    const cart = loadCart();
    const quantity = parseInt(cart[productId], 10);
    if (isNaN(quantity)) {
      return;
    }
    if (quantity === 1) {
      delete cart[productId];
    } else {
      cart[productId] = quantity - 1;
    }
    saveCart(cart);
  }

  removeAll(productId: number): void {
    const cart = loadCart();
    delete cart[productId];
    saveCart(cart);
  }

  getCart(): any {
    return loadCart();
  }
}
