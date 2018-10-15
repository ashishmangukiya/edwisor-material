import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SocketService } from '../../socket.service';
import { ListService } from '../../list.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  public recovery;
  public newPassword;
  public reEnterNewPassword;
  constructor(public toastr:ToastrService,public route:Router,public socket:SocketService,public list:ListService) { }

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
    else{
    let object={
      recoveryPassword:this.recovery,
      password:this.newPassword
    }
    this.list.updatePassword(object).subscribe(
      data=>{
        if(data['status']==200){
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
    this.route.navigate(['/login']);
  }

}
