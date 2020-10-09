import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product= new Product();

  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    });


  }
  handleProductDetails() {
    //get the id param and convert to number using +
    const productId = +this.route.snapshot.paramMap.get('id');

    this.productService.getProductDetail(productId).subscribe(
      data => {
        this.product = data.content;

      });

  }
  AddToCart(product:Product) {
    console.log("AddingToCart:" + this.product.name + "," + this.product.price);
    const theCartItem = new CartItem(product);
    this.cartService.AddToCart(theCartItem);
  }

}
