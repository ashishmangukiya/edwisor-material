import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SeriesHttpService } from '../series-http.service';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.css']
})
export class BookViewComponent implements OnInit {
  public currentId;
  public currentBook:any;
  constructor(public route:ActivatedRoute ,public _route:Router,public service:SeriesHttpService) {
   }

  ngOnInit() {
    this.currentId=this.route.snapshot.paramMap.get("id");

    this.service.getCurrentBook(this.currentId).subscribe(

      data=>{
        this.currentBook=data;
        console.log(this.currentBook);
      },
      error=>{
        console.log(error.errorMessage);
      }
    )

  }
}
