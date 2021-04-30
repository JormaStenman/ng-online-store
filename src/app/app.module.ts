import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NavbarComponent} from './components/navbar/navbar.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MainComponent} from './components/main/main.component';
import {ProductsComponent} from './components/products/products.component';
import {OrdersComponent} from './components/orders/orders.component';
import {CartComponent} from './components/cart/cart.component';
import {RouterModule, Routes} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {StoreService} from './store.service';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {ProductComponent} from './components/product/product.component';
import {CartService} from './cart.service';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatBadgeModule} from '@angular/material/badge';
import {OrderService} from './order.service';

const appRoutes: Routes = [
  {
    path: 'main',
    component: MainComponent,
  },
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'products/:product_id',
    component: ProductComponent,
  },
  {
    path: 'orders',
    component: OrdersComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: '**',
    redirectTo: 'main',
  },
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainComponent,
    ProductsComponent,
    OrdersComponent,
    CartComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatGridListModule,
    MatListModule,
    MatCardModule,
    MatTabsModule,
    RouterModule.forRoot(appRoutes),
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    MatTooltipModule,
    MatBadgeModule,
  ],
  providers: [
    CartService,
    StoreService,
    OrderService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
