import {Pipe, PipeTransform} from '@angular/core';
import {OrderStatus} from '../Order.model';

@Pipe({
  name: 'orderStatus'
})
export class OrderStatusPipe implements PipeTransform {

  transform(value: OrderStatus): string {
    switch (value) {
      case OrderStatus.ordered:
        return 'ordered';
      case OrderStatus.waitingForProducts:
        return 'waiting for products';
      default:
        return 'unknown';
    }
  }

}
