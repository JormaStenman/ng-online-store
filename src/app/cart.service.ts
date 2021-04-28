import {Injectable} from '@angular/core';

const storage = window.sessionStorage;

const key = 'me.stenman.cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  addToCart(productId: number): void {
    const cart = this.loadCart();
    cart[productId] ||= 0;
    cart[productId]++;
    this.saveCart(cart);
  }

  getCart(): any {
    return this.loadCart();
  }

  private loadCart(): any {
    return JSON.parse(storage.getItem(key) || '{}');
  }

  private saveCart(cart: any): void {
    storage.setItem(key, JSON.stringify(cart));
  }
}
