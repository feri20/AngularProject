import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';


@Injectable({
  providedIn: 'root'
})
export class CartService {


  cartItem: CartItem[] = [];
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }
  AddToCart(thecartItem: CartItem) {
    // check if we already have the item in our cart

    let alreadyExistInCart: boolean = false;
    let existingCartItem: CartItem = undefined;

    if (this.cartItem.length > 0) {

      //find the item in our card based on item id
      existingCartItem = this.cartItem.find(tempCartItem => tempCartItem.id == thecartItem.id);
      alreadyExistInCart = (existingCartItem != undefined);
    }
    if (alreadyExistInCart) {
      existingCartItem.quantity++;
    } else {
      this.cartItem.push(thecartItem);

    }

    this.computeCartTotal();


  }
  computeCartTotal() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;
    for (let currentCartItem of this.cartItem) {

      totalPriceValue = (currentCartItem.quantity * currentCartItem.price) + totalPriceValue;
      totalQuantityValue = totalQuantityValue + currentCartItem.quantity;
    }
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
    this.logCartData(totalPriceValue, totalQuantityValue);

  }
  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log("contents of the cart");
    for (let tempCartItem of this.cartItem) {
      const subTotalPrice = tempCartItem.price * tempCartItem.quantity;
      console.log("name:" + tempCartItem.name, "quantity:" + tempCartItem.quantity, "price:" + tempCartItem.price, "subTotalPrice:" + subTotalPrice);
    }
    console.log("totalPrice:" + totalPriceValue.toFixed(2), "totalQuantity:" + totalQuantityValue);
    console.log("----");
  }

  decrement(theCartItem: CartItem) {

    theCartItem.quantity--;
    if (theCartItem.quantity === 0) {
      this.remove(theCartItem);
    } else {
      this.computeCartTotal();
    }
  }
  remove(theCartItem: CartItem) {
    const itemIndex = this.cartItem.findIndex(tempCartItem => tempCartItem.id == theCartItem.id);
    if (itemIndex > -1) {
      this.cartItem.splice(itemIndex, 1);
      this.computeCartTotal();
    }

  }
}
