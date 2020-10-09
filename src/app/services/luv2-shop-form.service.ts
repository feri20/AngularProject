import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Country } from '../common/country';

@Injectable({
  providedIn: 'root'
})
export class Luv2ShopFormService {

  private countriesUrl = 'http://localhost:8089/api/country/';
  private statesUrl = 'http://localhost:8089/api/state/filter?country_code=';

  constructor(private httpClient:HttpClient) { }

  getStates(countryCode):Observable<any>{
    
    return this.httpClient.get(this.statesUrl+countryCode);
  }


  getCountries():Observable<any>{

    return this.httpClient.get(this.countriesUrl);

  }

  gerCreditCardMonth(startMonth:number):Observable<number[]>{
    let data:number[]=[];
    for(let theMonth=startMonth;theMonth<=12;theMonth++){
      data.push(theMonth);
    }
    return of(data);

  }
  getCreditCardYear(){

    let data:number[]=[];
    const startYear:number=new Date().getFullYear();
    const endYear:number=startYear+10;
    for(let theYear=startYear;theYear<=endYear;theYear++){
      data.push(theYear);
    }
    return of(data);
  }
}
