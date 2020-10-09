import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']

})
export class ProductComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean;
  pageNumber: number=1;
  pageSize: number=3;
  totalElements: number;
  totalPages:number;


  constructor(private productService: ProductService,
    private route: ActivatedRoute, private cartService: CartService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.Productslist();
    });

  }

  Productslist() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchProduct();
    } else {
      this.handleListProduct();



    }
  }

  handleSearchProduct() {

  
    const keyword = this.route.snapshot.paramMap.get('keyword');
    this.productService.searchProduct(keyword, this.pageNumber - 1, this.pageSize).subscribe(this.process());
  }

  handleListProduct() {
   

    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
    } else {
      this.currentCategoryId = 1;
    }
    if (this.previousCategoryId != this.currentCategoryId) {
      this.pageNumber = 1;
      
    }
    this.previousCategoryId = this.currentCategoryId;
    console.log('currentid' + this.currentCategoryId);
   
    
    this.productService.getProductListPagination(this.currentCategoryId, this.pageNumber - 1, this.pageSize).subscribe(
      this.process());
  }

  process() {
    return data => {
      this.products = data.content;
      this.pageNumber = data.number + 1;
      this.pageSize = data.size;
      this.totalElements = data.totalElements;
      this.totalPages=data.totalPages;
      console.log(this.pageSize,this.pageNumber,this.totalElements,this.totalPages);

    }
  }

  AddToCart(product: Product) {
    console.log("adding to cart:" + product.name + "," + product.price);
    const theCartItem = new CartItem(product);
    this.cartService.AddToCart(theCartItem);

  }
  
  updatePageSize(pageSize:number){

    this.pageSize=pageSize;
    this.pageNumber=1;
    this.Productslist();
  }


}







