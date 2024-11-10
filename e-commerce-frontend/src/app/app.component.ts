import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';  // Importation de CommonModule pour les directives de base

import {NavbarComponent} from './components/navbar/navbar.component';
import {ClientDashboardComponent} from './components/client-dashboard/client-dashboard.component';
import {SellerDashboardComponent} from './components/seller-dashboard/seller-dashboard.component';
import { PlaceOrderComponent } from './components/place-order/place-order.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { AddProductComponent } from './components/add-product/add-product.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavbarComponent,ClientDashboardComponent,SellerDashboardComponent,PlaceOrderComponent,ProductListComponent,AddProductComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
  
})

export class AppComponent {
  title = 'e-commerce-frontend';
}
