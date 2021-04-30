import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartService} from '../../cart.service';
import {Product, StoreService} from '../../store.service';
import {Subscription} from 'rxjs';
import {OrderService} from '../../order.service';

interface ProductRow {
  product: Product;
  quantity: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  displayedColumns = ['id', 'name', 'unitPrice', 'quantity', 'actions'];
  products: Array<ProductRow> = [];
  totalPrice = 0;
  private cart: any;
  private cartSub: Subscription | null = null;

  constructor(
    private cartService: CartService,
    private storeService: StoreService,
    private orderService: OrderService,
  ) {
  }

  ngOnInit(): void {
    [this.cart, this.cartSub] = this.cartService.addSubscription(cart => this.cart = cart);
    this.update();
  }

  ngOnDestroy(): void {
    if (this.cartSub) {
      this.cartSub.unsubscribe();
    }
  }

  private update(): void {
    this.products = Object.keys(this.cart)
      .map(key => parseInt(key, 10))
      .map(productId => this.storeService.getProductById(productId))
      .map(product => (product ? {product, quantity: this.cart[product.id]} : null) as ProductRow)
      .filter(productRow => productRow);
    this.totalPrice = this.products.reduce((total, row) => total + row.quantity * row.product.price, 0);
  }

  addOne(productId: number): void {
    this.cartService.addOne(productId);
    this.update();
  }

  removeOne(productId: number): void {
    this.cartService.removeOne(productId);
    this.update();
  }

  removeAll(productId: number): void {
    this.cartService.removeAll(productId);
    this.update();
  }

  emptyCart(): void {
    this.cartService.emptyCart();
    this.update();
  }

  placeOrder(): void {
    Object.keys(this.cart); // TODO
    this.orderService.addOrder({
      date: new Date(),
      items: [],
    });
  }
}
