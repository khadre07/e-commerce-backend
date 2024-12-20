import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Importer FormsModule pour ngModel

@Component({
  selector: 'app-seller-dashboard',
  templateUrl: './seller-dashboard.component.html',
  styleUrls: ['./seller-dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]  // Ajouter FormsModule ici
})
export class SellerDashboardComponent implements OnInit {
  products: any[] = [];
  newProduct: any = { name: '', price: 0 };
  salesStats: any = { totalSales: 0, totalOrders: 0 };

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadSalesStats();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des produits', error);
      }
    );
  }

  addProduct(): void {
    this.productService.addProduct(this.newProduct).subscribe(
      (product) => {
        this.products.push(product);
        this.newProduct = { name: '', price: 0 }; // Réinitialiser le formulaire
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du produit', error);
      }
    );
  }

  updateProduct(product: any): void {
    this.productService.updateProduct(product.id, product).subscribe(
      () => {
        console.log('Produit mis à jour avec succès');
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du produit', error);
      }
    );
  }

  deleteProduct(productId: number): void {
    this.productService.deleteProduct(productId).subscribe(
      () => {
        this.products = this.products.filter(p => p.id !== productId);
      },
      (error) => {
        console.error('Erreur lors de la suppression du produit', error);
      }
    );
  }

  loadSalesStats(): void {
    // Implémentez votre logique pour récupérer les statistiques de vente
    this.salesStats = {
      totalSales: 300.00,
      totalOrders: 15
    };
  }
}
