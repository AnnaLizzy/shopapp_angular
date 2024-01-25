import { IsString, IsNotEmpty, IsPhoneNumber, IsDate } from 'class-validator';
export class OrderDTO {
  @IsString()
  @IsNotEmpty()
  order_id: number;
  fullname: string;
  email: string;
  phone_number: string;
  address: string;
  note: string;
  total_money: number;
  payment_method: string;
  shipping_method: string;
  coupon_code: string;
  cartItems: [] = [];
  constructor(data: any) {
    this.order_id = data.order_id;
    this.fullname = data.fullname;
    this.email = data.email;
    this.phone_number = data.phone_number;
    this.address = data.address;
    this.note = data.note;
    this.total_money = data.total_money;
    this.payment_method = data.payment_method;
    this.shipping_method = data.shipping_method;
    this.coupon_code = data.coupon_code;
    this.cartItems = data.cartItems;
  }
}
