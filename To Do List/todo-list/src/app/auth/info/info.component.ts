import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  constructor(public route:Router ) { }

  ngOnInit() {
  }
  public goToHome(){
    this.route.navigate(['/']);
}

}
