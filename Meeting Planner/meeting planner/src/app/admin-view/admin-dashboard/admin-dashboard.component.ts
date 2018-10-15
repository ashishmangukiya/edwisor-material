import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { Observable, Subscriber } from 'rxjs';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { TestService } from '../../test.service';
import { SocketService } from '../../socket.service';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  providers:[ SocketService],
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

    public userList=[];
    public userInfo;
    public onlineUserList;
  constructor(public testService:TestService,public socket:SocketService,public toastr:ToastrService,public router:Router) { }
ngOnInit() {
    this.userInfo=this.testService.getAdminInfoFromLocalstorage();
  //  console.log(this.userInfo);
  this.getAllUserList();
  this.getOnlineUserList();


}

public getOnlineUserList(){
  this.socket.getAllOnlineUserList().subscribe(
    data=>{
//console.log(data);  
      this.userList=[];
  this.getAllUserList();      
    }
  )

}

public openNav(){
  document.getElementById("mySidenav").style.width = "250px";
}
public closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

public getAllUserList=()=>{
  this.testService.getAllUserList(this.userInfo.adminId).subscribe(
    (result)=>{
      if(result['status']==200){
      for(let user of result['data']){
        if(user.activated==true){
        let detail={
          firstName:user.firstName,
          lastName:user.lastName,
          userId:user.userId,
        }
        this.userList.push(detail);
      }
      }
  //    console.log(this.userList)
      }
    }
  )
  }

  public LogOut(){
    this.testService.logoutAdmin().subscribe(
      data=>{
        if(data.status==200){
        Cookie.delete('authToken');
        Cookie.delete('loggedInAdmin');
        this.testService.deleteAdminInfoInLocalStorage()
        this.toastr.success(data.message);
        this.socket.disconnect();
        
          setTimeout(()=>{
            this.router.navigate(['/']);
          },1000)
        }
      },
      (err)=>{
        this.toastr.error(err.error.message);
        setTimeout(()=>{
          this.router.navigate(['/']);
        },2000)
      }
    )
  }

}
