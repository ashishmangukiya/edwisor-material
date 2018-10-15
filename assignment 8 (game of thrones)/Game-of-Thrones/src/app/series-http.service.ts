import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import 'rxjs/Rx';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SeriesHttpService  {
public allbooks=[];
public allCharacters=[];
public y:number;
public baseUrl='https://anapioficeandfire.com/api';
public houses=[];
    
  constructor(public _http:HttpClient) {   }

  private handleError(err:HttpErrorResponse){
    console.log("Handle error http calls");
    console.log(err.message);
    return Observable.throw(err.message);
  }
 
  public getBooks = (i): any => {

    let response = this._http.get(`${this.baseUrl}/books/${i}`);
    return response;

  }
  public getCharacters = (i): any => {

    let response = this._http.get(`${this.baseUrl}/characters/${i}`);
    return response;

  }
  public getHouses = (i): any => {
    let response = this._http.get(`${this.baseUrl}/houses/${i}`);
    return response;

  }
  public getCurrentBook=(i):any=>{
    let response=this._http.get(`${this.baseUrl}/books/${i}`)
    return response;
  }
  
  public getCurrentCharacter = (i): any => {

    let response = this._http.get(`${this.baseUrl}/characters/${i}`);
    return response;

  }
  public getCurrentHouses = (i): any => {
    console.log(i);
    let response = this._http.get(`${this.baseUrl}/houses/${i}`);
    return response;

  }
  


  




}
