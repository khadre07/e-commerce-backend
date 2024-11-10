import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']

})
export class SignupComponent {
  signupData = { username: '', email: '', password: '', confirmPassword: '' };
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  signup() {
    this.authService.signup(this.signupData).subscribe({
      next: (response) => {
        this.successMessage = 'Signup successful! Please log in.';
        this.router.navigate(['/login']); // Redirection vers la page de connexion
      },
      error: (error) => {
        this.errorMessage = 'Signup failed. Please try again.';
        console.error('Signup failed', error);
      }
    });
  }
}
