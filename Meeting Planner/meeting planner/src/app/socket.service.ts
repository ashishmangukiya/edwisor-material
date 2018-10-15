import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, observable } from 'rxjs';

import { Cookie } from 'ng2-cookies/ng2-cookies';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  public baseUurl='http://plannerapi.ashishmangukiya.com';
  public socket;
  constructor() {
    this.socket=io(this.baseUurl);
   }
  
   public verify(){
     return Observable.create((observer)=>{
        this.socket.on('verify',(data)=>{
          observer.next(data);
        })
     })
   }
      
   public setAdmin(){
    let authToken=Cookie.get('authToken');
        this.socket.emit('set-user',authToken);
 }
   public setUser(){
    let authToken=Cookie.get('authToken');
    this.socket.emit('set-user',authToken);
   }
   public getAllOnlineUserList(){
     return Observable.create((observer)=>{
      this.socket.on('online-user-list',(data)=>{
        observer.next(data);
      })
     })
   }
   public messageToUser(event){
     this.socket.emit('user-message',event)
   }
   public messageFromAdmin(userId){
     return Observable.create((observer)=>{
       this.socket.on(userId,(data)=>{
         observer.next(data);
       })
     })
   }
   public deleteEvent(event){
    this.socket.emit('delete-message',event);
   }
   public sendReminder(meeting){
     this.socket.emit('get-reminder',meeting);
   }
  
   public sendReminderOffline(meeting){
     this.socket.emit('send-message-offline',meeting);
   }
   public disconnect(){
     this.socket.disconnect();
   }
   public stopReminder(data){
      
    this.socket.emit('stop-reminder',data);
   }
   public notificationFromUser(adminId){
      return Observable.create((observer)=>{
       this.socket.on(adminId,(data)=>{
         observer.next(data);
       })
     })
   }
   public getErrors(){
    return Observable.create((observer)=>{
      this.socket.on('get-errors',(data)=>{
        observer.next(data);
      })
    })
   }
 
  

}
