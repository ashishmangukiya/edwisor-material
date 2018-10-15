import { Component, OnInit } from '@angular/core';
import { ListService } from '../../list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.scss']
})
export class VerifyAccountComponent implements OnInit {
  public userId;
  public secretId;
  public simple;
  constructor(public list:ListService,public active:ActivatedRoute, public router: Router, private toastr: ToastrService) {
  }
  ngOnInit() {
    this.userId=this.active.snapshot.paramMap.get('userId');
    this.secretId=this.active.snapshot.paramMap.get('secretId');
    this.accountVerify();
  }
  public accountVerify(){
    let detail={
      userId:this.userId,
      secretId:this.secretId
    }
    console.log(detail)
    this.list.accountVerify(detail).subscribe(
      data=>{
          this.simple=data['status'];
      }
    )
  }

}
