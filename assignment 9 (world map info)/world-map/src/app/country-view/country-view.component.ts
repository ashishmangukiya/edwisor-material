import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from '../service.service';
import { Location } from '@angular/common';
import {Rules} from './country';
@Component({
  selector: 'app-country-view',
  templateUrl: './country-view.component.html',
  styleUrls: ['./country-view.component.css']
})
export class CountryViewComponent implements OnInit,Rules {
  public currentCountryCode:any;
  public countryDetail:any;
  public region:any;

  constructor(public _Location:Location, public router:Router,public _route:ActivatedRoute,public service:ServiceService) { }

  ngOnInit() {


    this.currentCountryCode=this._route.snapshot.paramMap.get('countryCode');

    this.service.getCountry(this.currentCountryCode).subscribe(
      data=>{
        this.countryDetail=data;

      },
      error=>{
        console.log(error.errorMessage)
      }
    )
  }
  
 
public getPrevious(){

  this._Location.back();

} 

}
