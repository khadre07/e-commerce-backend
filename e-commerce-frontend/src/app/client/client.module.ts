import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';  // Importez HttpClientModule ici
import { OrderService } from '../services/order.service';

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule  // Assurez-vous d'importer HttpClientModule
  ],
  providers: [OrderService],
  exports: [LoginComponent, SignupComponent]  // Exporter les composants si nécessaire
})
export class ClientModule {}
