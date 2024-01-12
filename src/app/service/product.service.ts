import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient, HttpParams,HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Products } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiGetProducts = environment.apiBaseUrl + '/products';
  constructor(private http: HttpClient) {}
  getProduct(keyword: string, categoryId: number,page: number, limit: number): Observable<Products[]> {
    const params = new HttpParams()
       .set('keyword', keyword.toString())
       .set('categoryId',categoryId.toString())
      .set('page', page.toString())
      .set('limit', limit.toString());
      
    return this.http.get<Products[]>(this.apiGetProducts, { params });
  }
}
