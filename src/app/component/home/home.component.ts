import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { Products } from '../../models/product';
import { ProductService } from '../../service/product.service';
import { environment } from '../../environment/environment';
import { Category } from '../../models/category';
import { CategoriesService } from '../../service/categories.service';
import { HttpErrorResponse } from '@angular/common/http';
import { error } from 'jquery';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,FooterComponent,HeaderComponent,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})


export class HomeComponent implements OnInit {
  products : Products[]=[]
  currentPage : number = 1
  itemsPerPage : number = 12
  pages : number[] = []
  totalPages : number = 0
  visiblePages : number [] = []
  categories : Category[] = []//lưu dữ liệu động từ categoriesService
  selectedCategoryId : number = 0//gía trị category được chọn
  keyword : string =''
  constructor(private productService: ProductService,
    private categoriesService: CategoriesService){  
  }

  ngOnInit(): void {
    this.getProducts(this.keyword, this.selectedCategoryId,this.currentPage, this.itemsPerPage)
    this.getCategories(1, 100)
  }
  getCategories(page : number, limit: number) {
    this.categoriesService.getCategories(page, limit).subscribe({
      next : (categories : Category[]) => {
        debugger
        this.categories = categories
      },
      complete:() =>{debugger},
      error: (error:any) => {
        console.error('Error fetching categories : ',error)
      }
    })
  }
  searchProducts(){
    this.currentPage = 1
    this.itemsPerPage = 12
    debugger
    this.getProducts(this.keyword,this.selectedCategoryId, this.currentPage,this.itemsPerPage)
  }

  getProducts(keyword: string,selectedCategoryId : number,page:number, limit:number){
    this.productService.getProduct(keyword, selectedCategoryId,page,limit).subscribe({
      next : (response : any) => {
        debugger 
        response.products.forEach((product : Products) => {
          product.url = environment.apiBaseUrl+'/products/image/'+product.thumbnail
        })
        this.products = response.products
        this.totalPages = response.totalPages
        this.visiblePages = this.generateVisiblePageArray(this.currentPage, this.totalPages)
      },
      complete : () =>{debugger},
      error : (error : any) => {
        debugger
       // console.error('Error fetching product : ',error)
       if (error instanceof HttpErrorResponse) {
        console.error('HTTP Error:', error.status);
        console.error('Error Details:', error.error);     
        
      }
      }
    })
  }
  generateVisiblePageArray(currentPage: number, totalPages: number): number[] {
    const maxVisiblePages = 5
    const haftVisiblePages = Math.floor(maxVisiblePages / 2)

    let startPages = Math.max(currentPage - haftVisiblePages,1)
    let endPages = Math.min(startPages + maxVisiblePages - 1 , totalPages)

    if(endPages - startPages + 1 < maxVisiblePages){
      startPages = Math.max(endPages - maxVisiblePages + 1 ,1)

    }
    return new Array(endPages - startPages + 1).fill(0).map((_,index) => startPages + index)
  }

  onPageChange(page : number){
    debugger
    this.currentPage = page
    this.getProducts(this.keyword,this.selectedCategoryId,this.currentPage, this.itemsPerPage)

    
  }

}
