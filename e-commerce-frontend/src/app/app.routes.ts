import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import {AddProductComponent} from './components/add-product/add-product.component';
import {ClientDashboardComponent} from './components/client-dashboard/client-dashboard.component';
import {PlaceOrderComponent} from './components/place-order/place-order.component';
import {ProductListComponent} from './components/product-list/product-list.component';
import {SellerDashboardComponent} from './components/seller-dashboard/seller-dashboard.component';
import {LoginComponent} from './client/login/login.component';
import {SignupComponent} from './client/signup/signup.component';
import {SellerLoginComponent} from './seller/login/login.component';
import {SellerSignupComponent} from './seller/signup/signup.component';
import { NavbarComponent } from './components/navbar/navbar.component';

export const routes: Routes = [
 { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'client/dashboard', component: ClientDashboardComponent},
  { path: 'seller/dashboard', component: SellerDashboardComponent},
  { path: 'placeorder', component: PlaceOrderComponent },
  { path: 'productlist', component: ProductListComponent },
  { path: 'addproduct', component: AddProductComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'sellerlogin', component: SellerLoginComponent},
  { path: 'sellersignup', component: SellerSignupComponent },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [
    // AppComponent,
    // NavbarComponent,
    // AddProductComponent,
    // ClientDashboardComponent,
    // PlaceOrderComponent,
    // ProductListComponent,
    // SellerDashboardComponent,
    LoginComponent,
    SignupComponent,
    // SellerLoginComponent,
    // SellerSignupComponent
  ]
})
export class AppRoutingModule {
  static routes = [
    { path: 'client-dashboard', component: ClientDashboardComponent }
  ];
}