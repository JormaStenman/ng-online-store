import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {CartService} from '../../cart.service';
import {Product, StoreService} from '../../store.service';
import {Subscription} from 'rxjs';
import {OrderService} from '../../order.service';
import {LineItem, Order} from '../../Order.model';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

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

  constructor(
    private cartService: CartService,
    private storeService: StoreService,
    private orderService: OrderService,
    private router: Router,
    private dialogService: MatDialog,
  ) {
  }

  displayedColumns = ['id', 'name', 'unitPrice', 'quantity', 'actions'];
  products: Array<ProductRow> = [];
  totalPrice = 0;
  private cart: any;
  private cartSub: Subscription | null = null;
  @ViewChild('thankYouModal', {read: TemplateRef, static: false})
  thankYouModal!: TemplateRef<any>;

  private static cartToOrder(cart: any): Order {
    return {
      items: Object.keys(cart)
        .map(productId => parseInt(productId, 10))
        .filter(productId => !isNaN(productId))
        .map(productId => ({
          productId,
          quantity: parseInt(cart[productId], 10),
        } as LineItem))
        .filter(lineItem => !isNaN(lineItem.quantity))
        .filter(lineItem => lineItem.quantity > 0)
    } as Order;
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
    const order = this.orderService.addOrder(CartComponent.cartToOrder(this.cart));
    this.dialogService
      .open(this.thankYouModal, {data: {order}})
      .afterClosed().subscribe(_ => {
      this.emptyCart();
      this.router.navigate(['/products']).catch();
    });
  }
}
