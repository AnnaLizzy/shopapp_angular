import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { Products } from '../../models/product';
import { OrderDTO } from '../../dtos/order.dto';
import { CartService } from '../../service/cart.service';
import { ProductService } from '../../service/product.service';
import { CategoriesService } from '../../service/categories.service';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { environment } from '../../environment/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { Validator } from 'class-validator';
import { __values } from 'tslib';
import { OrderService } from '../../service/order.service';
import { error } from 'jquery';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, FormsModule,ReactiveFormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent implements OnInit {
  orderForm!: FormGroup;
  cartItems: { product: Products; quantity: number }[] = [];
  couponCode: string = '';
  totalAmount: number = 0;
  orderData: OrderDTO = {
    order_id: 1,
    fullname: '',
    email: '',
    phone_number: '',
    address: '',
    note: '',
    total_money: 0,
    payment_method: 'cod',
    shipping_method: 'express',
    coupon_code: '',
    cartItems: [],
  };
  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private categoriesService: CategoriesService,
    private formBuilder: FormBuilder,
    private orderService : OrderService
  ) {
    
  }
  
  ngOnInit(): void {
    // ? ktra nhập liệu 
    // FIXME: 
    this.orderForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      email: ['', Validators.email],
      phone_number: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(9)]],
      address:['',Validators.required],
      note:[''],
      shipping_method :['express'],
      payment_method:['cod']
    });
   
   
  // ? ktra gio hang 
 
    const cart = this.cartService.getCart();
    const productIds = Array.from(cart.keys());

    this.productService.getProductsByIds(productIds).subscribe({
      next: (products) => {
        
        this.cartItems = productIds.map((productId) => {
          
          const product = products.find((p) => p.id === productId);
          if (product) {
            product.thumbnail =
              environment.apiBaseUrl + '/products/image/' + product.thumbnail;
          }
          return {
            product: product!,
            quantity: cart.get(productId)!,
          };
        });
        
      },
      complete: () => {
        
        this.calculatorTotal();
      },
      error: (err: any) => {
        console.error('Order fetching error' + err);
      },
    });    
  }
  placeOrder(){
    debugger
    if(this.orderForm.valid){
      this.orderData = {
        ...this.orderData ,
        ...this.orderForm.value
      }
    }
    this.orderService.placeOrder(this.orderData).subscribe({
      next: (response)=>{
        console.log('Đặt hàng thành công !')
        
      },
      complete: () =>{
        this.calculatorTotal()
      },
      error:(error : any){
        console.error('Lỗi đặt hàng : ',error)
      }
    })
  }
  /**
   * * calculatorTotal()
  * ! 
    
   */
  calculatorTotal(): void {
    
    this.totalAmount = this.cartItems.reduce(
      (total, item) => total + (item.product.price * item.quantity),
      0
    );
  }
  validateField(field: string) {
    const control = this.orderForm.get(field);
    if (control) {
      control.markAsTouched();
      control.markAsDirty();
    }
  }

}
