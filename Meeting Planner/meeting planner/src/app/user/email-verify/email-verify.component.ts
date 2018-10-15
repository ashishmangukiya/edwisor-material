import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Cookie } from 'ng2-cookies/ng2-cookies';
import { TestService } from '../../test.service';

@Component({
  selector: 'app-email-verify',
  templateUrl: './email-verify.component.html',
  styleUrls: ['./email-verify.component.css']
})
export class EmailVerifyComponent implements OnInit {

  public userId;
  public secretId;
  public simple;

  constructor(public testService:TestService,public active:ActivatedRoute, public router: Router, private toastr: ToastrService) {
  }
  ngOnInit() {
    this.userId=this.active.snapshot.paramMap.get('userId');
    this.secretId=this.active.snapshot.paramMap.get('secretKey');
    
    this.accountVerify();
  }

  public accountVerify(){
    let detail={
      userId:this.userId,
      secretId:this.secretId
    }
    this.testService.accountVerify(detail).subscribe(
      data=>{
          this.simple=data['status'];
      }
    )
  }

}
