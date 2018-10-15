import { Component, OnInit } from '@angular/core';
import { SeriesHttpService } from '../series-http.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  public books;
  public allBooks=[];
  public i;
  public y=1;

  constructor(public series:SeriesHttpService) { 

  }

  ngOnInit() {

    for(this.i =1;this.i<13;this.i++)  {
    this.books = this.series.getBooks(this.i).subscribe(   
      data => {

        this.books=data;

         this.all(this.books);
      },
      error => {
        console.log(error.errorMessage);
       
      });}


  }
  public all(books){
      books.id=this.y;
      
    this.allBooks.push(books);
   this.allBooks.sort((a,b)=>a.name.localeCompare(b.name));

        this.y++;
  }


   
     }
   






  
  

