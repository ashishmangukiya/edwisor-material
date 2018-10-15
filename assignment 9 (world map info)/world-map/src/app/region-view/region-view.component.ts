import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from '../service.service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import {Rules } from './region';
@Component({
  selector: 'app-region-view',
  templateUrl: './region-view.component.html',
  styleUrls: ['./region-view.component.css']
})
export class RegionViewComponent implements OnInit,Rules {
  public currentName:any;
  public currentRegion:any;
  public map:any;
  public currency:any;
  public current:any;
  public language:any;

  public p: number;


  constructor(public toastr:ToastrService,public _Location:Location,public router:Router,public _route:ActivatedRoute,public service:ServiceService) { }

  ngOnInit() {


    this.currentName=this._route.snapshot.paramMap.get('regionName');
    console.log(this.currentName);

    if(this.currentName==="north-america" || this.currentName==="south-america")
    {
      this.currentName="americas";
      this.service.getRegion(this.currentName).subscribe(

        data=>{
          this.currentRegion=data;
          this.toastr.success("you are in "+this.currentName+" region");

          this.count(this.currentRegion);
        },
        error=>{
          console.log(error.errorMessage);
        }
      )
    }
    else{
      this.service.getRegion(this.currentName).subscribe(

        data=>{
          this.currentRegion=data;
          this.toastr.success("you are in "+this.currentName+" region");

          this.count(this.currentRegion);


        },
        error=>{
          console.log(error.errorMessage);
        }
      )
    }
    if(this.currentName==="americas"){
      this.map="http://catolico.info/wp-content/uploads/2018/04/the-americas-map-america-map-map-pictures-536-x-632-pixels.jpg";
    }
    else if(this.currentName==="europe"){
      this.map="https://images-na.ssl-images-amazon.com/images/I/517Ao16bJBL._SX466_.jpg";
    }
    else if(this.currentName==="asia"){
      this.map="http://ocsjwilliams7.weebly.com/uploads/1/6/7/9/16795872/_5394232.jpg";
    }
    else if(this.currentName==="africa"){
      this.map="http://www.alearningfamily.com/main/wp-content/uploads/AfricaPolitical.jpg";
    }
    else {
    this.map="http://ontheworldmap.com/oceania/political-map-of-australia-and-oceania.jpg";
    }

  }
  public currencySearch(){
    if(this.currency)
    {
      this.service.getCurrency(this.currency).subscribe(
      data=>{
        this.currentRegion=data
        this.count(this.currentRegion);

      },
      error=>{
        this.toastr.warning("enter correct currency code ");
       setTimeout(()=>{
        window.location.reload();
      },1000);
        console.log(error.errorMessage)
    }
    )
  }
  }
  public languageSearch(){
    if(this.language)
    {
      this.service.getLanguage(this.language).subscribe(
      data=>{
        this.currentRegion=data;
        this.count(this.currentRegion);

      },
      error=>{
        this.toastr.warning("enter correct language code ");
       setTimeout(()=>{
        window.location.reload();

      },1000);
        console.log(error.errorMessage)
    }
    )
  }
  }

  public count(currentRegion){
    let count=0;
    for(let country of currentRegion)
    {
      count++;
    }
      if(count>1){
    this.toastr.success(count+" countries are there");
      }
      else
      this.toastr.success(count+" country found");

  }
   
public getPrevious(){

  this._Location.back();

} 

}
