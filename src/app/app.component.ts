import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { FooterComponent } from './component/footer/footer.component';
import { HeaderComponent } from './component/header/header.component';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { DetailProductComponent } from './component/detail-product/detail-product.component';
import { OrderConfirmComponent } from './component/order-confirm/order-confirm.component';
import { OrderComponent } from './component/order/order.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    CommonModule,
    RouterOutlet,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    RegisterComponent,
    LoginComponent,
    HttpClientModule,
    DetailProductComponent,
    OrderConfirmComponent,
    OrderComponent,
  ],
})
export class AppComponent {
  title = 'Shop selenium';
}
