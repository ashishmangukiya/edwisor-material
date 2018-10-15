import { Component, OnInit } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';
import { SeriesHttpService } from '../series-http.service';

@Component({
  selector: 'app-houses',
  templateUrl: './houses.component.html',
  styleUrls: ['./houses.component.css']
})
export class HousesComponent implements OnInit {
public i;
public houses;
public allHouses=[];
public y=1;
  constructor(public series:SeriesHttpService)  {}

  ngOnInit() {


    for(this.i =1;this.i<250;this.i++)  {
      this.houses = this.series.getHouses(this.i).subscribe(   
        data => {
  
          this.houses=data;
  
          this.all(this.houses);
        },
        error => {
          console.log(error.errorMessage);
         
        });}
        console.log(this.allHouses);

       
  }
  public all(houses){
      houses.id=this.y;
      if(!houses.coatOfArms )
      {
        houses.coatOfArms="N/A";
      }
      this.allHouses.push(houses);
      this.allHouses.sort((a,b)=>a.name.localeCompare(b.name));

      this.y++;
        
  }

}
