import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SocketService } from '../../socket.service';
import { ListService } from '../../list.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import * as $ from 'jquery';
import {Location} from '@angular/common';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss'],
  providers:[SocketService]
})
export class UserViewComponent implements OnInit {
  public userInput;
  public selectedTask;
  public newTask;
  public userInfo;
  public searchUser;
  public searchedList=[];
  public friendRequestList=[]
  public taskList=[];
  public taskName: any;
  public subTaskName: any;
  public friendList=[];
  public friendTaskList=[];
  public controller=false;
  currentFriend: any;
  user: { taskTitle: string; taskName: any; userId: any; userName: string;completed: boolean; createdOn: Date; private: boolean; };
  mainTask: any;
  index: any;
  constructor(public toastr:ToastrService,private _location: Location,public route:Router,public socket:SocketService,public list:ListService) { }

  ngOnInit() {

    this.userInfo=this.list.getUserDetailFromLocalStorage();
    this.verifyUser();
    this.getAllTasks();
    this.onlineUsersList();
    this.getUpdate();
    this.searchedResult();
    this.getRequestFromUser();
    this.friendListFunction();
    this.getAllFriendsRequest();
    this.errorMessage();
    this.friendNotification();
   
    
  }
  public verifyUser(){

    this.socket.verifyUser().subscribe(
      data=>{
        this.socket.setUser();
      }
    )

  }
  public openNav(){
    document.getElementById("mySidenav").style.width = "260px";
  }
  public closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }
 public onlineUsersList(){
   this.socket.onlineUsersList().subscribe(
     data=>{
     }
   )
 }
 public errorMessage(){
   this.socket.errorMessage().subscribe(
     data=>{
       if(data.status==500){
         this.toastr.warning(data.message);
       }
     }
   )
 }
 public friendListFunction(){
 this.list.getUserDetail(this.userInfo.userId).subscribe(
   data=>{
     this.friendList=[];
    if(data['status']==200){
      for(let friend of data['data'][0]['friendList']){
       this.friendList.push(friend);
      }
    }
  }
 ) 
 }
  public openList(task){
    this.selectedTask=task;
  }
  public openTaskList(task,mainTask,newTask=''){
    this.newTask=newTask;
    this.selectedTask=task;
    this.mainTask=mainTask
  }
  public isEmptyTask(task){
    if(task.taskList.length==0){
      this.toastr.warning('task not yet created');
    }
  }
  public getUpdate(){
    this.socket.getUpdate().subscribe(
      data=>{
        this.taskList=[];
        this.getAllTasks();
      }
    )
  }
  public friendNotification(){
    this.socket.friendNotification().subscribe(
      data=>{
        if(data.userId==this.userInfo.userId && this.currentFriend.length!=0){
          this.getusersAllTasks(this.currentFriend);
        }
        else if(data.mainId==this.userInfo.userId && this.controller==false){
          this.toastr.success(data.message);
          this.taskList=[];
          this.getAllTasks();
        }
        else{
          this.toastr.success(data.message);
        }
      }
    )    
  }
  public searchedResult(){
    this.socket.searchedResult().subscribe(
      data=>{
        this.friendListFunction();
        this.searchedList=[];
        for(let list of data){
          let count=0;
          if(list.userId!=this.userInfo.userId){

            for(let friend of this.friendList){
              if(list.userId==friend.id && friend.active=='false'){
                let request={
                  userId:list.userId,
                  email:list.email,
                  mobileNumber:list.mobileNumber,
                  userName:list.userName,
                  friend:false,
                  newFriend:false
                }
                count++;
                this.searchedList.push(request);
                break;
              }
              else if(list.userId==friend.id && friend.active=='true'){
                let request={
                  userId:list.userId,
                  email:list.email,
                  mobileNumber:list.mobileNumber,
                  userName:list.userName,
                  friend:true,
                  newFriend:false
                }
                count++;
                this.searchedList.push(request);
                break;
              }
          }
          if(count!=1){
            let request={
              userId:list.userId,
              email:list.email,
              mobileNumber:list.mobileNumber,
              userName:list.userName,
              friend:false,
              newFriend:true
            }
            this.searchedList.push(request);
          }

          }
        }
        if(this.searchedList.length==0){
          this.toastr.success('searched friend not found')
          this.controller=false;
        }

      }
    )
  }
  public getRequestFromUser(){
    this.socket.getRequestFromUser(this.userInfo.userId).subscribe(
      data=>{
        if(data.status==200){
          this.controller=false;
          this.friendTaskList=[];
          this.friendListFunction();
          this.getAllFriendsRequest();
        }
        else{
        this.friendListFunction();
        this.getAllFriendsRequest();
        }
      }
    )
  }  
  public getAllFriendsRequest(){
    this.list.getAllFriendsRequest(this.userInfo.userId).subscribe(
      data=>{
        this.friendRequestList=[];
        if(data['status']==200){
          for(let request of data['data']){
            this.friendRequestList.push(request);
          }
          
        }   
      }
    )
  }
  public sendRequest(userDetail){
    let user={
      senderId:this.userInfo.userId,
      senderName:this.userInfo.userName,
      recieverId:userDetail.userId,
      recieverName:userDetail.userName
    }
    this.toastr.success(`request has been sent to ${userDetail.userName}`)
    this.socket.sendRequest(user);
    this.controller=false;
  }
  public homePage(){
    this.controller=false;
    this.friendTaskList=[];
  }
  public searchFriend(event){
    if(event.keyCode==13){
      this.controller=true;
      this.friendTaskList=[];
      this.socket.searchFriend(this.searchUser);
      this.searchUser='';
    }
  }
  public getAllTasks(){
    this.list.getAllTasks(this.userInfo.userId).subscribe(
      data=>{
        if(data['status']==200){
        for(let task of data['data']){
          this.taskList.push(task);
        }
        this.taskList = this.taskList.sort((first, second)=>{
          return first.createdOn > second.createdOn ? -1 :( first.createdOn < second.createdOn? 1 :0 ) ; 
        })
      }
      }
    )
  }
  public getusersAllTasks(friendDetail){
    this.currentFriend=friendDetail;
    this.friendTaskList=[];
    this.searchedList=[];
    this.list.getAllFriendTasks(friendDetail.id).subscribe(
      data=>{
        if(data['status']==200){
        for(let task of data['data']){
          if(task.completed==false){
          this.friendTaskList.push(task);
          }
        }
        this.friendTaskList = this.friendTaskList.sort((first, second)=>{
          return first.createdOn > second.createdOn ? -1 :( first.createdOn < second.createdOn? 1 :0 ) ; 
        })
      
      }
      if(this.friendTaskList.length==0){
        this.toastr.warning(`${friendDetail.name} doesn't have any public tasks `)
      }
      }
    )

  }
  public addTitle(){
    this.user={
      taskTitle:'',
      taskName:'',
      userId:this.userInfo.userId,
      userName:this.userInfo.firstName+' '+this.userInfo.lastName,
      completed:false,
      createdOn:new Date(),
      private:false

    }
  }
  public createTask(task){
    if(task.taskTitle==' ' || task.taskTitle==undefined || task.taskTitle==''){
      this.toastr.warning('you can not create empty tasktitle')
    }
    else{
   this.socket.createTask(task);

    }
   // this.socket.createTask(user);
  }
  public LogOut(){

    this.list.logOut().subscribe(
      data=>{
        if(data['status']==200){
          this.socket.disconnect();
          Cookie.delete('authToken');
          Cookie.delete('loggedInUser');
          this.list.deleteUserDetailFromLocalStorage();
          this.toastr.success(data['message']);
          setTimeout(()=>{
            this.route.navigate(['/']);
          },1000);
        }
      },
      (err)=>{
        this.toastr.warning(err.error.message);
      }
    )

  }
  public requestAccepted(user){
    this.socket.acceptedRequest(user);
  }
  public requestReject(task){
    this.socket.rejectRequest(task);
  }
  public unFriend(){
    let detail={
      friendId:this.currentFriend.id,
      userId:this.userInfo.userId
    }
    this.socket.unFriend(detail);
  }
  public completedTask(task){
    this.toastr.success(`'${task.taskName}' marked as completed `)
  this.socket.completedTask(task);
  }
  public completedSubTask(task,taskList){
    this.toastr.success(`'${task.subTaskName}' marked as completed `)
    let taskDetail={
      id:taskList.id,
      subTaskId:task.subTaskId,
    }
  this.socket.completedSubTask(taskDetail);
  }
  public reCompleteTask(task){
    this.socket.reCompleteTask(task);
    }
  public reCompleteSubTask(task,taskList){
      let taskDetail={
        id:taskList.id,
        subTaskId:task.subTaskId,
      }
    this.socket.reCompleteSubTask(taskDetail);
    }
  public addTask(task){
  if(this.taskName==' ' || this.taskName==undefined || this.taskName==''){
      this.toastr.warning('you can not create empty task')
    }
    else{
      let taskDetail={
      taskId:task.taskId,
      taskName:this.taskName
    }
    this.socket.addTask(taskDetail);
  }
    this.taskName='';
  }
  public addSubTask(task){
    if(this.subTaskName==' ' || this.subTaskName==undefined || this.subTaskName==''){
      this.toastr.warning('you can not create empty sub-task')
    }
    else{
    let subTaskDetail={
      id:task.id,
      subTaskName:this.subTaskName
    }
    this.socket.addSubTask(subTaskDetail);}
    this.subTaskName='';
  }
  public addFriendTask(task){
    if(this.taskName==' ' || this.taskName==undefined || this.taskName==''){
      this.toastr.warning('you can not create empty task')
    }
    else{
    let taskDetail={
      taskId:task.taskId,
      taskName:this.taskName
    }
    this.list.addFriendTask(taskDetail).subscribe(
      data=>{
        if(data['status']==200){
          let message=`'${taskDetail.taskName}' task of '${task.userName}' has been added by ${this.userInfo.userName}`
          let info={
            userId:this.userInfo.userId,
            mainId:task.userId,
            message:message
          } 
          this.socket.notifyToAllFriends(info);
        }
        else{
          this.toastr.error(data['message'])
        }
      }
    )}
    this.taskName='';
  }
  public addFriendSubTask(task,mainTask){
    if(this.subTaskName==' ' || this.subTaskName==undefined || this.subTaskName==''){
      this.toastr.warning('you can not create empty sub-task')
    }
    else{
    let subTaskDetail={
      id:task.id,
      subTaskName:this.subTaskName
    }
    this.list.addFriendSubTask(subTaskDetail).subscribe(
      data=>{
        if(data['status']==200){
          let message=`'${subTaskDetail.subTaskName}' task of '${mainTask.userName}' has been added by ${this.userInfo.userName}`
          let info={
            userId:this.userInfo.userId,
            mainId:mainTask.userId,
            message:message
          } 
          this.socket.notifyToAllFriends(info);
        }
        else{
          this.toastr.error(data['message'])
        }
      }
    )}
    this.subTaskName='';
  }
  public undoTask(task){
    this.socket.undoTask(task.taskId);
  }
  public undoSubTask(newTask){
    this.socket.undoSubTask(newTask.id);
  }
  public undofriendTask(task){
    let detail={
      taskId:task.taskId,
      userId:this.userInfo.userId,
      mainId:task.userId,
      name:task.userName,
      userName:this.userInfo.userName,
    }
    this.socket.undoFriendTask(detail);
  }
  public undofriendSubTask(newTask,mainTask){
    let detail={
      id:newTask.id,
      userId:this.userInfo.userId,
      mainId:mainTask.userId,
      name:mainTask.userName,
      userName:this.userInfo.userName,
    }
    this.socket.undoFriendSubTask(detail);
  }
  public updateTask(taskDetail){
    if(taskDetail.taskName==' ' || taskDetail.taskName==undefined || taskDetail.taskName==''){
      this.toastr.warning('you can not make empty task')
    }
    else{
    let task={
      id:taskDetail.id,
      taskName:taskDetail.taskName
    }
    this.socket.updateTask(task);}
  }
  public updateSubTask(taskDetail){
    if(taskDetail.subTaskName==' ' || taskDetail.subTaskName==undefined || taskDetail.subTaskName==''){
      this.toastr.warning('you can not make empty sub-task')
    }
    else{
    let subTaskDetail={
      subTaskId:taskDetail.subTaskId,
      id:this.mainTask.id,
      subTaskName:taskDetail.subTaskName
    }
    this.socket.updateSubTask(subTaskDetail);}
  }
  public editFriendTask(task,mainTask){
    if(task.taskName==' ' || task.taskName==undefined || task.taskName==''){
      this.toastr.warning('you can not make empty sub-task')
    }
    else{
    let taskDetail={
      id:task.id,
      taskName:task.taskName
    }
    this.list.editFriendTask(taskDetail).subscribe(
      data=>{
        if(data['status']==200){
          let message=`'${taskDetail.taskName}' task of '${mainTask.userName}' has been edited by ${this.userInfo.userName}`
          let info={
            userId:this.userInfo.userId,
            mainId:mainTask.userId,
            message:message
          } 
          this.socket.notifyToAllFriends(info);
        }
        else{
          this.toastr.error(data['message'])
        }
      }
    )}
  }
  public editFriendSubTask(task,mainTask){
    if(task.subTaskName==' ' || task.subTaskName==undefined || task.subTaskName==''){
      this.toastr.warning('you can not make empty sub-task')
    }
    else{
    let taskDetail={
      subTaskId:task.subTaskId,
      id:this.newTask.id,
      subTaskName:task.subTaskName
    }
    this.list.editFriendSubTask(taskDetail).subscribe(
      data=>{
        if(data['status']==200){
          let message=`'${taskDetail.subTaskName}' task of '${mainTask.userName}' has been edited by ${this.userInfo.userName}`
          let info={
            userId:this.userInfo.userId,
            mainId:mainTask.userId,
            message:message
          } 
          this.socket.notifyToAllFriends(info);
        }
        else{
          this.toastr.error(data['message'])
        }
      }
    )}
  }
  public deleteFullTask(task){
    this.socket.deleteFullTask(task.taskId);
  }
  public deleteTask(newTask,task){
    let deleteData={
      task:newTask,
      taskId:task.taskId
    }
    this.socket.deleteTask(deleteData);
  }
  public deleteSubTask(task,newTask){
    let detail={
      subTask:task,
      id:newTask.id
    }
    this.socket.deleteSubTask(detail);
  }
  public deleteFriendFullTask(task){
    this.list.deleteFriendFullTask(task.taskId).subscribe(
      data=>{
        if(data['status']==200){
          let message=`'${task.taskTitle}' task of '${task.userName}' has been deleted by ${this.userInfo.userName}`
          let info={
            userId:this.userInfo.userId,
            mainId:task.userId,
            message:message
          } 
          this.socket.notifyToAllFriends(info);
        }
        else{
          this.toastr.error(data['message'])
        }
      }
    )
  }
  public deleteFriendTask(task,mainTask){
       let taskDetail={
         task:task,
         userId:this.userInfo.userId,
         mainId:mainTask.userId,
         message:`'${task.taskName}' task of '${mainTask.userName}' has been deleted by ${this.userInfo.userName}`,
         taskId:mainTask.taskId
       }
       this.socket.deleteFriendTask(taskDetail);
  }
  public deleteFriendSubTask(task,newTask,mainTask){
    let taskDetail={
      subTask:task,
      userId:this.userInfo.userId,
      mainId:mainTask.userId,
      message:`'${task.subTaskName}' task of '${mainTask.userName}' has been deleted by ${this.userInfo.userName}`,
      id:newTask.id
    }
    this.socket.deleteFriendSubTask(taskDetail);
   
  }
 

}
