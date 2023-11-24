import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './detail-product/detail-product.component.html',
    styleUrls: ['./detail-product/detail-product.component.scss'],
    imports: [CommonModule, RouterOutlet, HomeComponent, FooterComponent, HeaderComponent]
})
export class AppComponent {
  title = 'shopapp-angular';
}
