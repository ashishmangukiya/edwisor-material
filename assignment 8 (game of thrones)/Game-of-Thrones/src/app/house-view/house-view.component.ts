import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SeriesHttpService } from '../series-http.service';

@Component({
  selector: 'app-house-view',
  templateUrl: './house-view.component.html',
  styleUrls: ['./house-view.component.css']
})
export class HouseViewComponent implements OnInit {

  public currentId;
  public currentHouse:any;
  constructor(public route:ActivatedRoute ,public _route:Router,public service:SeriesHttpService) {
   }

  ngOnInit() {
    this.currentId=this.route.snapshot.paramMap.get("id");

    this.service.getCurrentHouses(this.currentId).subscribe(

      data=>{
        this.currentHouse=data;
        this.fullHouse(this.currentHouse);
        console.log(this.currentHouse);
      },
      error=>{
        console.log(error.errorMessage);
      }
    )

  }
  public fullHouse(house){
    if(!house.region)
    {
     house.region="N/A"; 
    }
    if(!house.coatOfArms)
    {
     house.coatOfArms="N/A"; 
    }if(!house.words)
    {
     house.words="N/A"; 
    }if(!house.titles[0])
    {
     house.titles="N/A"; 
    }if(!house.founded)
    {
     house.founded="N/A"; 
    }if(!house.heir)
    {
     house.heir="N/A"; 
    }if(!house.seats[0])
    {
     house.seats="N/A"; 
    }if(!house.overlord)
    {
     house.overlord="N/A"; 
    }if(!house.founder)
    {
     house.founder="N/A"; 
    }if(!house.cadetBranches[0])
    {
     house.cadetBranches="N/A"; 
    }
    


  }
  
}
