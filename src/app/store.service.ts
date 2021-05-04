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
const key = 'me.stenman.products';

function initProducts(): Array<Product> {
  // @ts-ignore
  const products = [...initialProducts.default];
  storeProducts(products);
  return products;
}

function loadProducts(): Array<Product> {
  const item = storage.getItem(key);
  return item ? JSON.parse(item) : initProducts();
}

function storeProducts(products: Array<Product>): void {
  storage.setItem(key, JSON.stringify(products));
}

function clearProducts(): void {
  storage.removeItem(key);
}

function hasStorage(): boolean {
  return storage.getItem(key) !== null;
}

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private static productRef(productId: number, products?: Array<Product> | undefined): Product | undefined {
    return (products || loadProducts()).find(p => p.id === productId);
  }

  getAllProducts(): Array<Product> {
    return loadProducts();
  }

  getProductById(productId: number): Product | undefined {
    const productRef = StoreService.productRef(productId);
    return productRef ? {...productRef} : undefined;
  }

  sellProduct(productId: number, quantity: number): boolean {
    const allProducts = loadProducts();
    const productRef = StoreService.productRef(productId, allProducts);
    if (productRef) {
      productRef.inventory -= quantity;
      storeProducts(allProducts);
      return productRef.inventory >= 0;
    }
    console.error(`no product found matching id ${productId}`);
    return false;
  }

  returnProduct(productId: number, quantity: number): void {
    const allProducts = loadProducts();
    const productRef = StoreService.productRef(productId, allProducts);
    if (productRef) {
      productRef.inventory += quantity;
      storeProducts(allProducts);
    }
  }

  clearProducts(): void {
    clearProducts();
  }

  hasStorage(): boolean {
    return hasStorage();
  }
}
