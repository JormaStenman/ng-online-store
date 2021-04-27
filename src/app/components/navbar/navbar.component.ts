import {Component} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  links = [
    {label: 'Main', path: 'main'},
    {label: 'Products', path: 'products'},
    {label: 'My Orders', path: 'orders'},
    {label: 'Shopping cart', path: 'cart'},
  ];
  activeLink = this.links[0];
}
