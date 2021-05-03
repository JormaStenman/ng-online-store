import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderService} from '../../order.service';
import {Order} from '../../Order.model';
import {StoreService} from '../../store.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  order: Order | undefined;
  displayedColumns = ['product', 'quantity', 'unitPrice'];
  @ViewChild('reallyCancelModal', {read: TemplateRef, static: false})
  reallyCancelModal!: TemplateRef<any>;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private storeService: StoreService,
    private router: Router,
    private dialogService: MatDialog,
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

  orderTotal(): number {
    if (this.order) {
      return this.order.items.reduce((total, lineItem) =>
        total + lineItem.quantity * lineItem.unitPrice, 0);
    }
    return 0;
  }

  cancelOrder(): void {
    this.dialogService
      .open(this.reallyCancelModal)
      .afterClosed().subscribe(reallyCancel => {
      if (reallyCancel && this.order) {
        this.orderService.cancelOrder(this.order.id);
        this.router.navigate(['/orders']).catch();
      }
    });
  }
}
