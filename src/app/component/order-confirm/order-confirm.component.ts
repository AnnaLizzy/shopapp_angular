import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { Products } from '../../models/product';
import { ProductService } from '../../service/product.service';
import { CartService } from '../../service/cart.service';
import { environment } from '../../environment/environment';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-confirm',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, FormsModule],
  templateUrl: './order-confirm.component.html',
  styleUrl: './order-confirm.component.scss',
})
export class OrderConfirmComponent implements OnInit {
  cartItems: { product: Products; quantity: number }[] = [];
  totalAmount: number = 0;
  couponCode: string = '';
  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const cart = this.cartService.getCart();
    const productIds = Array.from(cart.keys());

    this.productService.getProductsByIds(productIds).subscribe({
      next: (products) => {
        debugger;
        this.cartItems = productIds.map((productId) => {
          const product = products.find((p) => p.id === productId);
          if (product) {
            product.thumbnail =
              environment.apiBaseUrl + '/products/image/' + product.thumbnail;
          }
          return { product: product!, quantity: cart.get(productId)! };
        });
        // console.error('Error');
      },
      complete: () => {
        debugger;
        this.calculatorTotal();
      },
      error: (error: any) => {
        console.error('Error fetching detail ' + error);
      },
    });
  }
  calculatorTotal(): void {
    debugger;
    this.totalAmount = this.cartItems.reduce(
      (total, item) => total + (item.product.price * item.quantity),
      0
    );
  }
  applyCoupon(): void {
    
  }
}
