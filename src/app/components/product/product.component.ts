import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Params, Router} from '@angular/router';
import {Product, StoreService} from '../../store.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storeService: StoreService,
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

}
