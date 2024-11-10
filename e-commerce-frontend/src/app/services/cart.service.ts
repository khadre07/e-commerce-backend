import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:3000/api/cart'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) {}

  // Récupérer les articles du panier pour un utilisateur donné
  getCartItems(userId: string | null): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/items?userID=${userId}`);
  }

  // Ajouter un produit au panier
  addToCart(productId: string, userId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/addtocart`, { productId, userId });
  }

  // Supprimer un produit du panier
  removeFromCart(productId: string, userId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/removefromcart?id=${productId}&userID=${userId}`);
  }

  // Passer une commande
  placeOrder(orderData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/placeOrder`, orderData);
  }

  // Autres méthodes peuvent être ajoutées ici
}
