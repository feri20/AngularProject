import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cartItem: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.listCartDetails();
  }
  listCartDetails() {

    this.cartItem = this.cartService.cartItem;
    this.cartService.totalPrice.subscribe(
      data => { this.totalPrice = data; }
    );
   
    this.cartService.totalQuantity.subscribe(
      data=>{this.totalQuantity=data;}
    );
    
    this.cartService.computeCartTotal();
  }
  incrementQuantity(theCartItem:CartItem){

    this.cartService.AddToCart(theCartItem);

    }
    decrementQuantity(theCartItem:CartItem){
      this.cartService.decrement(theCartItem);
    }
    remove(theCartItem:CartItem){
      this.cartService.remove(theCartItem);

    }

}
