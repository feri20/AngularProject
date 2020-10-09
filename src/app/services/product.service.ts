import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../common/product';



@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private categoryurl = 'http://localhost:8089/api/category/';

  constructor(private httpClient: HttpClient) { }

  getProductListPagination(categoryId: number, pageNumber: number, pageSize: number): Observable<any> {

    const Url = environment.baseUrl + '?category_id=' + categoryId + '&page=' + pageNumber + '&size=' + pageSize;
    return this.getProduct(Url);

  }
  getProductCategories(): Observable<any> {
    return this.httpClient.get(this.categoryurl);

  }

  searchProduct(keyword: string, pageNumber: number, pageSize: number): Observable<any> {
    const searchUrl = environment.searchUrl + '?name=' + keyword + '&page=' + pageNumber + '&size=' + pageSize;
    return this.getProduct(searchUrl);

  }
  private getProduct(url: string): Observable<any> {
    return this.httpClient.get(url);
  }
  getProductDetail(productId: number): Observable<any> {
    const ProductUrl = environment.baseUrl + '?id=' + productId;
    return this.httpClient.get(ProductUrl);
  }


}



