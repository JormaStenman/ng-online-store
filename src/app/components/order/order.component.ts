import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderService} from '../../order.service';
import {Order} from '../../Order.model';
import {StoreService} from '../../store.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  order: Order | undefined;
  displayedColumns = ['product', 'quantity', 'unitPrice'];

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private storeService: StoreService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const orderId = params.get('order_id');
      if (orderId) {
        this.order = this.orderService.getOrderById(orderId);
      }
      if (!this.order) {
        this.router.navigate(['/orders']).catch();
      }
      // @ts-ignore
      this.order.items = this.order.items
        .map(lineItem => {
          const product = this.storeService.getProductById(lineItem.productId);
          return ({
            ...lineItem,
            productName: (product && product.name) || '',
          });
        });
    });
  }

}
