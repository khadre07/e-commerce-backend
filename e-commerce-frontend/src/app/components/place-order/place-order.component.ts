import { Component, NgModule, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service'; // Assurez-vous d'avoir un service pour gérer le panier
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css'],
  standalone: true
})
@NgModule({
  declarations: [PlaceOrderComponent],
  imports: [
    CommonModule,
    FormsModule  // Assurez-vous que FormsModule est bien ici
  ]
})
export class PlaceOrderComponent implements OnInit {
  order: any = {};  // Assurez-vous que 'order' est initialisé
  
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    // Simuler un chargement des données du produit
    this.loadProductData();
  }

  loadProductData(): void {
    this.productService.getProducts().subscribe(
      (data) => {
        this.order = data; // Simuler le produit récupéré
      },
      (error) => {
        console.error('Erreur lors du chargement du produit', error);
      }
    );
  }

  placeOrder(): void {
    if (this.order && this.order.productId) {
      // Vérifier si 'order' et 'productId' existent avant de les utiliser
      console.log('Placing order with productId:', this.order.productId);
      // Continuez avec la logique de commande ici...
    } else {
      console.error('productId est manquant ou "order" est non défini');
    }
  }
}
