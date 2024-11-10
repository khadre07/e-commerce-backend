import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth'; // Remplacez avec votre URL d'authentification

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        // Sauvegarde le jeton JWT et le rôle utilisateur
        localStorage.setItem('token', response.token);
        localStorage.setItem('userRole', response.role); // ex : "client" ou "seller"
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    this.router.navigate(['/login']);
  }

  getRole(): string | null {
    return localStorage.getItem('userRole');
  }
  getUserId(): string | null {
    return localStorage.getItem('userId'); // Récupère l'ID de l'utilisateur du stockage local
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  signup(signupData: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signup`, signupData).pipe(
      tap(response => {
        console.log('Signup successful', response);
      })
    );
  }
}
