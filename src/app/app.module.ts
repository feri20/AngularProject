import { BrowserModule } from '@angular/platform-browser';
import { Component, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { ProductComponent } from './components/product/product.component';
import { CategoryMenuComponent } from './components/category-menu/category-menu.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'
import { AppRoutingModule } from './app-routing.module';
import {Routes,RouterModule} from '@angular/router';
import { Product } from './common/product';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckoutComponent } from './components/checkout/checkout.component';

const routes : Routes = [
   {path:'checkout',component:CheckoutComponent},
   {path:'cart-details',component:CartDetailsComponent},
   {path:'products/:id',component:ProductDetailsComponent},
   {path:'search/:keyword',component:ProductComponent},
   {path:'category/:id',component:ProductComponent},
   {path:'category',component:ProductComponent},
   {path:'products',component:ProductComponent},
   {path:'',redirectTo: '/products',pathMatch:'full'},
   {path:'**' ,redirectTo: '/products',pathMatch:'full'}
   

];



@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    CategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent
   
  ],
  imports: [
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
