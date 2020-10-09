import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/common/category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-category-menu',
  templateUrl: './category-menu.component.html',
  styleUrls: ['./category-menu.component.css']
})
export class CategoryMenuComponent implements OnInit {

  categories:Category[];
  constructor(private productService:ProductService) { }


  ngOnInit() {
    this.listCategories();
  }
  listCategories(){
    this.productService.getProductCategories().subscribe(
      data => {
        console.log(JSON.stringify(data));
           this.categories = data;
      }
    );
  }

}
