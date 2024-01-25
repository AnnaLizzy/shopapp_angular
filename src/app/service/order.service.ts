import { Injectable } from "@angular/core";
import { environment } from "../environment/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn:'root'
})
export class OrderService{
    private apiGetOrder =  environment.apiBaseUrl + '/orders'
    constructor(private http: HttpClient){}
    public placeOrder(){
        
    }
}