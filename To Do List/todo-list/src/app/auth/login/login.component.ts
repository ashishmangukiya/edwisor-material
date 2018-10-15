import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SocketService } from '../../socket.service';
import { ListService } from '../../list.service';
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public email: any;
  public password: any;
  constructor(public toastr:ToastrService,public route:Router,public socket:SocketService,public list:ListService) { }

  ngOnInit() {

  }
  public signUpFunction=()=>{
      this.route.navigate(['/signup']);
  }
  public forgotPassword(){
    this.route.navigate(['/forgot-password'])
  }
  public resetPassword=()=>{
    if(!this.email){
      this.toastr.warning('enter email Id');
    }
    else{
        let data={
          email:this.email
        }
        this.list.resetPassword(data).subscribe(
          data=>{
            if(data['status']==200){
            this.toastr.success(data['message']);
            setTimeout(()=>{
              this.forgotPassword();
            },2000);
          }
          else{
            this.toastr.error(data['message'])
          }
          },
          err=>{
            this.toastr.error('hello')
            this.toastr.error(err.error.message)

          }
        )
    }
  }
  public userView(){
    this.route.navigate(['/user-view'])
  }
  public logInFunction=()=>{
    if(!this.email){
      this.toastr.warning('enter email Id');
    }
    else if(!this.password){
      this.toastr.warning('enter password ');
    }
    else{
      let userDetail={
        email:this.email,
        password:this.password
      }
      this.list.logInUser(userDetail).subscribe(
        (data)=>{
          if(data['status']==200 && data['data']['userDetails']['activated']==true){
          Cookie.set('authToken',data['data']['authToken']);
          Cookie.set('loggedInUser',data['data']['userDetails']['userId']);
          this.list.setUserDetailInLocalStorage(data['data']['userDetails']);
          this.toastr.success(data['message']);
          setTimeout(()=>{
            this.userView();
          },1000)
          }
          else if(data['status']==200 && data['data']['userDetails']['activated']==false){
            this.toastr.warning('your account is not verified plz verify ')
          }
        },
        (err)=>{
          this.toastr.error(err.error.message)
        }
      )
    }
  }
}
