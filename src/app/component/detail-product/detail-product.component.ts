import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { Products } from '../../models/product';
import { ProductService } from '../../service/product.service';
import { CategoriesService } from '../../service/categories.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ProductImage } from '../../models/product.image';
import { environment } from '../../environment/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-detail-product',
  standalone: true,
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.scss',
  imports: [CommonModule, HeaderComponent, FooterComponent],
})
export class DetailProductComponent implements OnInit {
  product?: Products;
  productId: number = 0;
  quantity: number = 1;
  currentImageIndex: number = 0;
  constructor(
    private productService: ProductService,
    private categoryService: CategoriesService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private cartService: CartService
  ) {}
  ngOnInit(): void {
    // lấy id từ URL
    //const idParam = this.activeRouter.
    //this.cartService.clearCart()
    this.styledLog(
      'Nguồn này không có gì để xem ',
      'color: red ; font-size: 22px;'
    );
    this.styledLog(
      'Đây là một tính năng của trình duyệt dành cho các nhà phát triển. Nếu ai đó bảo bạn sao chép-dán nội dung nào đó vào đây để bật một tính năng , bạn nên dừng lại!',
      'color: yellow  ; font-size: 15px;'
    );
    debugger;
    const idParam = 5; //dung tam 1 gia tri
    if (idParam !== null) {
      this.productId = idParam;
    }
    if (!isNaN(this.productId)) {
      this.productService.getDetailProduct(this.productId).subscribe({
        next: (response: any) => {
          debugger;
          //lay ds san pham va thay doi url
          if (
            response.product_images &&
            typeof response.product_images === 'string'
          ) {
            // Chuyển đổi chuỗi JSON thành đối tượng JavaScript
            response.product_images = JSON.parse(response.product_images);
          }
          //ktra đổi Json sang array
          if (
            Array.isArray(response.product_images) &&
            response.product_images.length > 0
          ) {
            response.product_images.forEach((product_images: ProductImage) => {
              product_images.imageUrl =
                environment.apiBaseUrl +
                '/products/image/' +
                product_images.imageUrl;
            });
          }

          this.product = response;
          //bat dau voi hinh anh dau tien
          this.showImage(0);
        },
        complete: () => {
          debugger;
        },
        error: (error: any) => {
          console.error('Error : ', error);
        },
      });
    } else {
      console.error('Invalid productId', idParam);
    }
  }
  styledLog(message: string, style: string): void {
    console.warn(`%c${message}`, style);
  }
  showImage(index: number): void {
    if (
      this.product &&
      this.product.product_images &&
      this.product.product_images.length > 0
    ) {
      debugger;

      index = index < 0 ? 0 : this.product.product_images.length - 1;

      this.currentImageIndex = index;
      //gan va cap nhat current image index
    }
  }
  thumbnailClick(index: number) {
    //goi thumbnail khi bam vao
    this.currentImageIndex = index;
    //show index cap nhat current image
  }
  nextImage(): void {
    debugger;
    this.showImage(this.currentImageIndex + 1);
  }
  previousImage(): void {
    debugger;
    this.showImage(this.currentImageIndex - 1);
  }
  addToCart(): void {
    debugger;
    if (this.product) {
      this.cartService.addToCart(this.productId, this.quantity);
    } else {
      console.error('khong the them san pham vao gio hang khi product = null');
    }
  }
  increaseQuantity(): void {
    this.quantity++;
  }
  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
  buyNow(): void {}
}
