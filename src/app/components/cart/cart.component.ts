import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CartService} from '../../cart.service';
import {Product, StoreService} from '../../store.service';

interface ProductRow {
  product: Product;
  quantity: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  displayedColumns = ['id', 'name', 'unitPrice', 'quantity', 'actions'];
  products: Array<ProductRow> = [];
  totalPrice = 0;

  @Output()
  cartUpdated: EventEmitter<null> = new EventEmitter<null>();

  constructor(
    private cartService: CartService,
    private storeService: StoreService,
  ) {
  }

  ngOnInit(): void {
    this.update();
  }

  private update(): void {
    const cart = this.cartService.getCart();
    this.products = Object.keys(cart)
      .map(key => parseInt(key, 10))
      .map(productId => this.storeService.getProductById(productId))
      .map(product => (product ? {product, quantity: cart[product.id]} : null) as ProductRow)
      .filter(productRow => productRow);
    this.totalPrice = this.products.reduce((total, row) => total + row.quantity * row.product.price, 0);
    this.cartUpdated.emit();
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
}
