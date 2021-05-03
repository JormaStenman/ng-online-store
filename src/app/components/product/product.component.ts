import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Product, StoreService} from '../../store.service';
import {CartService} from '../../cart.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product: Product | undefined;
  @ViewChild('addToCartModal', {read: TemplateRef, static: false})
  addToCartModal!: TemplateRef<any>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storeService: StoreService,
    private cartService: CartService,
    private dialogService: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const param = params.get('product_id');
      if (param) {
        const productId = parseInt(param, 10);
        if (!isNaN(productId)) {
          this.product = this.storeService.getProductById(productId);
        }
      }
      if (!this.product) {
        this.router.navigate(['/products']).catch();
      }
    });
  }

  addToCart(product: Product): void {
    this.cartService.addOne(product.id);
    const dialogRef = this.dialogService.open(this.addToCartModal, {
      data: {
        product,
      },
    });
    const timeout = setTimeout(() => dialogRef.close(), 5000);
    dialogRef.afterClosed().subscribe(_ => clearTimeout(timeout));
  }

}
