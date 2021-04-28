import {Component, OnInit} from '@angular/core';
import {Product, StoreService} from '../../store.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Array<Product> | undefined;

  constructor(private storeService: StoreService) {
  }

  ngOnInit(): void {
    this.products = this.storeService.getAllProducts();
  }

}
