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
    CartComponent
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
  ],
  providers: [
    StoreService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
