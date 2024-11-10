import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  credentials = { username: '', password: '' };
  errorMessage: string = '';
  isLoading: boolean = false;  // Indicateur pour savoir si la requête est en cours

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.errorMessage = '';  // Réinitialiser le message d'erreur à chaque tentative
    this.isLoading = true;   // Démarrer le chargement

    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        // Redirection en fonction du rôle
        const role = this.authService.getRole();
        if (role === 'client') {
          this.router.navigate(['/client/dashboard']);
        } else if (role === 'seller') {
          this.router.navigate(['/seller/dashboard']);
        }
      },
      error: (error) => {
        this.errorMessage = 'Login failed. Please check your credentials.';
        console.error('Login failed', error);
      },
      complete: () => {
        this.isLoading = false;  // Terminer le chargement
      }
    });
  }
}
