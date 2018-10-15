import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import io from 'socket.io-client';
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  public url='http://todoapi.ashishmangukiya.com';
  public socket;
  constructor() {
    this.socket=io(this.url);
   }

   public verifyUser(){
    return Observable.create((observer)=>{
      this.socket.on('verify-user',(data)=>{
        observer.next(data);
      })
    })
   }

   public setUser(){
     this.socket.emit('set-user',Cookie.get('authToken'))
   }
   public onlineUsersList(){
    return Observable.create((observer)=>{
      this.socket.on('online-user-list',(data)=>{
        observer.next(data);
      })
    })
   }
   public createTask(task){
      this.socket.emit('create-task',task);
   }
  
   public getUpdate(){
    return Observable.create((observer)=>{
      this.socket.on('get-update',(data)=>{
        observer.next(data);
      })
    })
   }
   public disconnect(){
     this.socket.disconnect();
   }
   public completedTask(task){
     this.socket.emit('completed-task',task);
   }
   public completedSubTask(task){
    this.socket.emit('completed-sub-task',task);
  }
  public reCompleteTask(task){
    this.socket.emit('re-complete-task',task);
  }
  public reCompleteSubTask(task){
   this.socket.emit('re-complete-sub-task',task);
 }
   public addTask(task){
    this.socket.emit('add-task',task)
   }
   public addSubTask(task){
     this.socket.emit('add-sub-task',task);
   }
   public updateTask(task){
    this.socket.emit('update-task',task)
   }
   public updateSubTask(task){
     this.socket.emit('update-sub-task',task);
   }
   public deleteFullTask(taskId){
     this.socket.emit('delete-full-task',taskId);
   }
   public deleteTask(taskId){
    this.socket.emit('delete-task',taskId);
  }
  public deleteFriendTask(task){
    this.socket.emit('delete-friend-task',task);
  }
  public deleteFriendSubTask(task){
    this.socket.emit('delete-friend-sub-task',task);
  }
  public deleteSubTask(task){
    this.socket.emit('delete-sub-task',task);
  }
   public searchFriend(searchUser){
  this.socket.emit('search-user',searchUser);
  }
  public searchedResult(){
    return Observable.create((observer)=>{
      this.socket.on('searched-result',(data)=>{
        observer.next(data);
      })
    })
  }
  public sendRequest(user){
    this.socket.emit('send-request',user);
  }
  public getRequestFromUser(userId){
    return Observable.create((observer)=>{
      this.socket.on(userId,(data)=>{
        observer.next(data);
      })
    })
  }
  public acceptedRequest(user){
    this.socket.emit('accepted-request',user)
  }
  public rejectRequest(detail){
    this.socket.emit('reject-request',detail)
  }
  public errorMessage(){
    return Observable.create((observer)=>{
      this.socket.on('error-message',(data)=>{
            observer.next(data);
      })
    })
  }
  public friendNotification(){
    return Observable.create((observer)=>{
      this.socket.on('friend-notify',(data)=>{
        observer.next(data);
      })
    })
  }
  public notifyToAllFriends(message){
    this.socket.emit('send-to-all-friend',message);
  }
  public undoTask(taskId){
    this.socket.emit('undo-task',taskId);
  }
  public undoSubTask(id){
    this.socket.emit('undo-sub-task',id);
  }
  
  public unFriend(detail){
    this.socket.emit('unfriend',detail);
  }
  public undoFriendTask(detail){
    this.socket.emit('undo-friend-task',detail);

  }
  public undoFriendSubTask(detail){
    this.socket.emit('undo-friend-sub-task',detail);
  }

}
