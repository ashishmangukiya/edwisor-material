import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  public regionUrl="https://restcountries.eu/rest/v2/region/";
  public countryUrl="https://restcountries.eu/rest/v2/alpha/";
  public currencyUrl="https://restcountries.eu/rest/v2/currency/";
  public languageUrl="https://restcountries.eu/rest/v2/lang/";
  constructor(public http:HttpClient) { }

public getRegion(regionName){

  let response=this.http.get(this.regionUrl+regionName);
  return response;
}

public getCountry(countryCode){

  let response=this.http.get(this.countryUrl+countryCode);
  return response;
}

public getCurrency(code){
  console.log("running");
  let response=this.http.get(this.currencyUrl+code);
  return response
}
public getLanguage(language){
  console.log("running");
  let response=this.http.get(this.languageUrl+language);
  return response

}
}
