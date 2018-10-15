import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router' 
@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent implements OnInit {

  constructor(public router:Router,public _route:ActivatedRoute) {
    
   }

  ngOnInit() {
  }

}
