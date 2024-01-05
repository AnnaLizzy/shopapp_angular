import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-order-confirm',
  standalone: true,
  imports: [CommonModule,HeaderComponent,FooterComponent],
  templateUrl: './order-confirm.component.html',
  styleUrl: './order-confirm.component.scss'
})
export class OrderConfirmComponent {

}
