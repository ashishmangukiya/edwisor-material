import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Cookie } from 'ng2-cookies/ng2-cookies';
import { TestService } from '../../test.service';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  public recovery;
  public checked=false;
  public newPassword;
  public reEnterNewPassword;
  constructor(public testService:TestService, public router: Router, private toastr: ToastrService) {
  }
  ngOnInit() {
  }
  public submit(){
    if(!this.recovery){
      this.toastr.warning('enter recovery password ');
    }
    else if(!this.newPassword ){
      this.toastr.warning('enter new password ');
    }
    else if(!this.reEnterNewPassword){
      this.toastr.warning('re-enter password');
    }
    else if(!(this.newPassword===this.reEnterNewPassword)){
      this.toastr.warning('password is not being matched');
    }
    else if(this.checked==false){
    let object={
      recoveryPassword:this.recovery,
      password:this.newPassword

    }

    this.testService.updatePassword(object).subscribe(
      data=>{
        if(data.status==200){
          this.toastr.success('password updated successfully');
          setTimeout(()=>{

            this.goToLogIn();
          },1500);
        }
      }
    )
  }
  else{
    let object={
      recoveryPassword:this.recovery,
      password:this.newPassword

    }

    this.testService.updatePasswordAdmin(object).subscribe(
      data=>{
        if(data.status==200){
          this.toastr.success('password updated successfully');
          setTimeout(()=>{

            this.goToLogIn();
          },1500);
        }
      }
    )

  }
  }
  public goToLogIn(){
    this.router.navigate(['/log-in']);
  }
}
