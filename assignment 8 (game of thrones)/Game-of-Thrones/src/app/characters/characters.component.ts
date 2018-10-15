import { Component, OnInit } from '@angular/core';
import { SeriesHttpService } from '../series-http.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {

  public allCharacters=[];
  public i;
  public characters;
  public y=1;

  

  constructor(public series:SeriesHttpService,public _http:HttpClient) { }

  
  ngOnInit() {

    for(this.i =1;this.i<300;this.i++)  {
    this.characters = this.series.getCharacters(this.i).subscribe(   
      data => {

        this.characters=data;

        this.all(this.characters);
      },
      error => {
        console.log(error.errorMessage);
       
      });}
      console.log(this.allCharacters);
  }
  public all(character){

    if((character.name && character.gender) && character.aliases[0].length!=0 && character.aliases.length!<=5)
    {
      character.id=this.y;

      this.allCharacters.push(character);
      this.allCharacters.sort((a,b)=>a.name.localeCompare(b.name));


    }
    this.y++;


        
  }

    









}
