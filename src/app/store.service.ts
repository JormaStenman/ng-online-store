import {Injectable} from '@angular/core';
import * as initialProducts from '../assets/data/products.json';

export interface Product {
  id: number;
  name: string;
  details: string;
  price: number;
  inventory: number;
}

const storage = window.localStorage;
// noinspection SpellCheckingInspection
const productsKey = 'me.stenman.products';

function initProducts(): Array<Product> {
  const copyOfInitial = [...initialProducts];
  storeProducts(copyOfInitial);
  return copyOfInitial;
}

function loadProducts(): Array<Product> {
  const item = storage.getItem(productsKey);
  return item ? JSON.parse(item) : initProducts();
}

function storeProducts(products: Array<Product>): void {
  storage.setItem(productsKey, JSON.stringify(products));
}

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  getAllProducts(): Array<Product> {
    return loadProducts();
  }
}
