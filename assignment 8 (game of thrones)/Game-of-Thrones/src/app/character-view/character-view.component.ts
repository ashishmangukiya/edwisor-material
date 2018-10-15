import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SeriesHttpService } from '../series-http.service';

@Component({
  selector: 'app-character-view',
  templateUrl: './character-view.component.html',
  styleUrls: ['./character-view.component.css']
})
export class CharacterViewComponent implements OnInit {

  public currentId;
  public currentCharacter:any;
  constructor(public route:ActivatedRoute ,public _route:Router,public service:SeriesHttpService) {
   }

  ngOnInit() {
    this.currentId=this.route.snapshot.paramMap.get("id");

    this.service.getCurrentCharacter(this.currentId).subscribe(

      data=>{
        this.currentCharacter=data;
        this.getFullCharacter(this.currentCharacter);
        console.log(this.currentCharacter);
      },
      error=>{
        console.log(error.errorMessage);
      }
    )

  }
  public getFullCharacter(character){
    
    if(!character.gender)
    {
      character.gender="N/A";
    }
    if(!character.born)
    {
      character.born="N/A";
    } if(!character.died)
    {
      character.died="N/A";
    } if(!character.culture)
    {
      character.culture="N/A";
    } if(!character.father)
    {
      character.father="N/A";
    } if(!character.mother)
    {
      character.mother="N/A";
    } if(!character.spouse)
    {
      character.spouse="N/A";
    } if(!character.playedBy[0])
    {
      character.playedBy="N/A";
    } if(!character.titles[0])
    {
      character.titles="N/A";
    }
    if(!character.aliases[0])
    {
      character.aliases="N/A";
    } if(!character.tvSeries[0])
    {
      character.tvSeries="N/A";
    }  if(!character.povBooks[0])
    {
      character.povBooks="N/A";
    }







  
  
  
  
  
  
  
  
  
  }

}
