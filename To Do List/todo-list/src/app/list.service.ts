import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  public url='http://todoapi.ashishmangukiya.com/api/v1';
  constructor(public http:HttpClient) { }

public setUserDetailInLocalStorage(userDetail){
    localStorage.setItem('userInfo',JSON.stringify(userDetail))
}
public getUserDetailFromLocalStorage(){
  return JSON.parse(localStorage.getItem('userInfo'));
}
public deleteUserDetailFromLocalStorage(){
    localStorage.removeItem('userInfo');
}
public logInUser(userDetail){
  let params=new HttpParams()
      .set('email',userDetail.email)
      .set('password',userDetail.password)
  return this.http.post(this.url+'/user/login',params);
}
public resetPassword(data){
  let params=new HttpParams()
    .set('email',data.email)
    return this.http.post(this.url+'/user/resetPassword',params);
}
public updatePassword(passwordDetail){
  let params=new HttpParams()
    .set('recoveryPassword',passwordDetail.recoveryPassword)
    .set('password',passwordDetail.password)
    return this.http.post(this.url+'/user/updatePassword',params);
}
public signUp(userDetail){
  let params=new HttpParams()
      .set('firstName',userDetail.firstName)
      .set('lastName',userDetail.lastName)
      .set('mobileNumber',userDetail.mobileNumber)
      .set('country',userDetail.country)
      .set('email',userDetail.email)
      .set('password',userDetail.password)
  return this.http.post(this.url+'/user/signup',params);
}
public getCountryNames(){
  return this.http.get('../assets/countryList.json');

}
public getCountryNumbers(){
  return this.http.get('../assets/countryCodes.json');
}
public accountVerify(detail){
  let params=new HttpParams()
  .set('userId',detail.userId)
  .set('secretId',detail.secretId)
  return this.http.post(this.url+'/user/verify/account',params)
}
public getAllTasks(userId){
  let params=new HttpParams()
  .set('authToken',Cookie.get('authToken'))
  .set('userId',userId)
  return this.http.post(this.url+'/get/all/tasks',params);
}
public getAllFriendTasks(userId){
  let params=new HttpParams()
  .set('authToken',Cookie.get('authToken'))
  .set('userId',userId)
  return this.http.post(this.url+'/get/all/friend/tasks',params);

}
public logOut(){
  let params=new HttpParams()
  .set('authToken',Cookie.get('authToken'))
  return this.http.post(this.url+'/user/logout',params)
}
public getAllFriendsRequest(userId){

  let params=new HttpParams()
  .set('authToken',Cookie.get('authToken'))
  .set('userId',userId)
  return this.http.post(this.url+'/get/all/friendsRequest',params);
}
public getUserDetail(userId){
  let params=new HttpParams()
  .set('authToken',Cookie.get('authToken'))
  .set('userId',userId)
  return this.http.post(this.url+'/get/user/detail',params);
}

public deleteFriendFullTask(task){
  let params=new HttpParams()
  .set('authToken',Cookie.get('authToken'))
  .set('taskId',task)
  return this.http.post(this.url+'/delete/friend/full/task',params)
}
public addFriendTask(task){
  let params=new HttpParams()
  .set('authToken',Cookie.get('authToken'))
  .set('taskId',task.taskId)
  .set('taskName',task.taskName)
  return this.http.post(this.url+'/add/friend/task',params)
}
public addFriendSubTask(task){
  let params=new HttpParams()
  .set('authToken',Cookie.get('authToken'))
  .set('id',task.id)
  .set('subTaskName',task.subTaskName)
  return this.http.post(this.url+'/add/friend/sub/task',params)
}
public editFriendTask(task){
  let params=new HttpParams()
  .set('authToken',Cookie.get('authToken'))
  .set('id',task.id)
  .set('taskName',task.taskName)
  return this.http.post(this.url+'/edit/friend/task',params)
}
public editFriendSubTask(task){
  let params=new HttpParams()
  .set('authToken',Cookie.get('authToken'))
  .set('subTaskId',task.subTaskId)
  .set('id',task.id)
  .set('subTaskName',task.subTaskName)
  return this.http.post(this.url+'/edit/friend/sub/task',params)
}
}
