import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // Importez CommonModule
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.css'],
  standalone: true,
  imports: [CommonModule]  // Ajoutez CommonModule dans imports
})
export class ClientDashboardComponent implements OnInit {
  orders: any[] = [];
  recommendations: any[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
    this.loadRecommendations();
  }

  loadOrders(): void {
    this.orderService.getOrders().subscribe(
      (data) => {
        this.orders = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des commandes', error);
      }
    );
  }

  loadRecommendations(): void {
    // Implémentez votre logique de recommandations ou d'API ici
    this.recommendations = [
      { product: 'Produit C', price: 29.99 },
      { product: 'Produit D', price: 39.99 },
    ];
  }
}
