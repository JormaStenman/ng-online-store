import {Injectable} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {Subscription} from 'rxjs';

const storage = window.sessionStorage;

const key = 'me.stenman.cart';

function loadCart(): any {
  return JSON.parse(storage.getItem(key) || '{}');
}

function saveCart(cart: any): void {
  storage.setItem(key, JSON.stringify(cart));
}

function clearCart(): void {
  storage.removeItem(key);
}

function hasStorage(): boolean {
  return storage.getItem(key) !== null;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartSubject: EventEmitter<any> = new EventEmitter();

  static countItems(cart: any): number {
    return Object.values(cart)
      .map(val => val as number)
      .reduce((acc, val) => acc + val, 0);
  }

  addSubscription(next: (value: any) => void): (any | Subscription)[] {
    return [this.getCart(), this.cartSubject.subscribe(next)];
  }

  addOne(productId: number): void {
    const cart = loadCart();
    cart[productId] ||= 0;
    cart[productId]++;
    saveCart(cart);
    this.emitCart(cart);
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
    this.emitCart(cart);
  }

  emptyCart(): void {
    saveCart({});
    this.emitCart({});
  }

  removeAll(productId: number): void {
    const cart = loadCart();
    delete cart[productId];
    saveCart(cart);
    this.emitCart(cart);
  }

  private getCart(): any {
    return {...loadCart()};
  }

  private emitCart(cart: any): void {
    this.cartSubject.emit({...cart});
  }

  clearCart(): void {
    clearCart();
  }

  hasStorage(): boolean {
    return hasStorage();
  }
}
