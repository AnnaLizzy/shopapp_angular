import { Injectable } from "@angular/core";
import { environment } from "../environment/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";


@Injectable({
    providedIn:'root'
})
export class CategoriesService{
    private apiGetProducts = environment.apiBaseUrl+'/categories'
    constructor(private http:HttpClient){
       
    }
    getCategories(page: number, limit : number): Observable<any>{
        // Sử dụng HttpParams để thêm các tham số vào URL query string
    const params = new HttpParams()
    .set('page', page.toString())
    .set('limit', limit.toString());
        return this.http.get<any[]>(this.apiGetProducts,{params})
    }
}