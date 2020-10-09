import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { CartService } from 'src/app/services/cart.service';
import { Luv2ShopFormService } from 'src/app/services/luv2-shop-form.service';
import { Lov2shopValidators } from 'src/app/validators/lov2shop-validators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup;
  totalPrice: number ;
  totalQuantity: number ;
  creditCardYear: number[] = [];
  creditCardMonth: number[] = [];
  countries: Country[] = [];
  shippingState :State[]=[];
 
  constructor(private formBuilder: FormBuilder, private luv2ShopFormService: Luv2ShopFormService,
    private CartService:CartService) { }
  
  ngOnInit(): void {

    
    this.checkoutFormGroup = this.formBuilder.group(
      {
        customer: this.formBuilder.group({
          firstName:new FormControl('',[Validators.required,Validators.minLength(2),Lov2shopValidators.notOnlyWhiteSpace]),
          lastName:new FormControl('',[Validators.required,Validators.minLength(2),Lov2shopValidators.notOnlyWhiteSpace]),
          email: new FormControl('',[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),Lov2shopValidators.notOnlyWhiteSpace]),

        }),
        shippingAddress: this.formBuilder.group({
          street: [''],
          city: [''],
          state: [''],
          country: [''],
          zipCode: ['']
        }),
        billingAddress: this.formBuilder.group({
          street: [''],
          city: [''],
          state: [''],
          country: [''],
          zipCode: ['']
        }),
        creditCard: this.formBuilder.group({
          cardType: [''],
          nameOnCard: [''],
          cardNumber: [''],
          securityCode: [''],
          expirationMonth: [''],
          expirationYear: ['']
        }),
      });

    const startMonth: number = new Date().getMonth() + 1;
    console.log("startmonth:" + startMonth);
    this.luv2ShopFormService.gerCreditCardMonth(startMonth).subscribe(
      data => {
        console.log("retrieved creditcard month:" + JSON.stringify(data));
        this.creditCardMonth = data;
      }
    );

    this.luv2ShopFormService.getCreditCardYear().subscribe(
      data => {
        console.log("retrieved creditcard year:" + JSON.stringify(data));
        this.creditCardYear = data;
      }
    );
    this.luv2ShopFormService.getCountries().subscribe(
      data => {
        console.log('retrieved countries' + JSON.stringify(data));
        this.countries = data;
      }
    );
    


  }


  onSubmit() {

    if(this.checkoutFormGroup.invalid){ this.checkoutFormGroup.markAllAsTouched();}
    console.log("handling the submit button");
    console.log(this.checkoutFormGroup.get('customer').value);
    console.log("the shipping Adress country is:"+this.checkoutFormGroup.get('shippingAddress'));
  }

  get firstName(){return this.checkoutFormGroup.get('customer.firstName');}
  get lastName(){return this.checkoutFormGroup.get('customer.lastName');}
  get email(){return this.checkoutFormGroup.get('customer.email');}

  copyShippingToBilling(event) {
    if (event.target.checked) {
      this.checkoutFormGroup.controls.billingAddress.setValue(
        this.checkoutFormGroup.controls.shippingAddress.value
      );
    } else {
      this.checkoutFormGroup.controls.billingAddress.reset();

    }

  }

  handleMonthAndYear() {

    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');
    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup.value.expirationYear);

    let startMonth: number;
    if (currentYear == selectedYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }
    this.luv2ShopFormService.gerCreditCardMonth(startMonth).subscribe(
      data => {
        console.log("retrieved credit card months:" + JSON.stringify(data));
        this.creditCardMonth = data;
      }
    );
  }
  getCountryState(formGroupName:string) {
    const formGroup=this.checkoutFormGroup.get(formGroupName);
    const CountryCode=formGroup.value.country.code;
    console.log("code:"+ CountryCode);

    this.luv2ShopFormService.getStates(CountryCode).subscribe(
      data=>{
        if(formGroupName==='shippingAddress'){
        this.shippingState=data;
      }
    }
    );
  }
  updateCartStatus() {
    this.CartService.totalQuantity.subscribe(
      data => { this.totalQuantity = data; }
    );
    this.CartService.totalPrice.subscribe(
      data => { this.totalPrice = data; }
    );
  }
  

}