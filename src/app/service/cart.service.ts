import { Injectable } from "@angular/core";
import { ProductService } from "./product.service";

@Injectable({
    providedIn:'root'
})
export class CartService{
    private cart : Map<number, number> = new Map()
    constructor(private productService: ProductService){
        const storedCart =localStorage.getItem('cart')
        if(storedCart){
            this.cart = new Map(JSON.parse(storedCart))
        }
    }
    addToCart(productId : number, quantity : number = 1):void{
        debugger
        if(this.cart.has(productId)){
            //Nếu sp có trong giỏ hàng tăng số lượng quantity len
            this.cart.set(productId,this.cart.get(productId)! + quantity)
        }
        else{
            //ko co trong gio hang se them vao gio hangf
            this.cart.set(productId,quantity)
        }
        this.saveCartToLocalStorage();
    }
    private saveCartToLocalStorage() : void {
        debugger
        localStorage.setItem('cart',JSON.stringify(Array.from(this.cart.entries())))
    }
    getCart(): Map<number,number>{
       return this.cart
    }
    clearCart():void{
        this.cart.clear()
        this.saveCartToLocalStorage()
    }
}