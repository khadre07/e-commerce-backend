import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { FormsModule } from '@angular/forms';  // Importez FormsModule
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  standalone: true
})
@NgModule({
  declarations: [AddProductComponent],
  imports: [
    CommonModule,
    FormsModule  // Assurez-vous que FormsModule est bien ici
  ]
})
export class AddProductComponent {
  product = { name: '', price: 0, description: '' };

  constructor(private productService: ProductService) {}

  addProduct(): void {
    this.productService.addProduct(this.product).subscribe(
      (response) => {
        console.log('Produit ajouté avec succès:', response);
        this.product = { name: '', price: 0, description: '' };
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du produit:', error);
      }
    );
  }
}
