import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { Observable, Subscriber } from 'rxjs';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { TestService } from '../../test.service';
import { SocketService } from '../../socket.service';
import {
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
  isToday,
  isThisHour,
  getMinutes,
  getSeconds,
  getTime
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';
import { $ } from 'protractor';
const colors: any = {
    red: {
      primary: '#ad2121',
      secondary: '#FAE3E3'
    },
    blue: {
      primary: '#1e90ff',
      secondary: '#D1E8FF'
    },
    yellow: {
      primary: '#e3bc08',
      secondary: '#FDF1BA'
    }
  };  
@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  providers:[ SocketService],

  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {
  public userInfo;
  public reminder;
  public messageList;
  constructor(private modal: NgbModal,public socket:SocketService,public testService:TestService,public toastr:ToastrService,public router:Router,public route:ActivatedRoute) {}

  ngOnInit() {
    this.userInfo=this.testService.getUserInfoFromLocalstorage();
    this.verifyUser();
    this.getAllEvents();
    this.messageFromAdmin();
    this.getReminder();
   


  }
  @ViewChild('modalContent')   modalContent: TemplateRef<any>;
  @ViewChild('alert')  alert: TemplateRef<any>;
  modalData: {
    action: string;
    event: CalendarEvent;
  };


  public verifyUser(){
    this.socket.verify().subscribe(
      data=>{
   
        this.socket.setUser();
      })}
  public openNav(){
    document.getElementById("mySidenav").style.width = "250px";
}

public closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

  public  getReminder(){
    this.socket.messageFromAdmin(this.userInfo.userId).subscribe(
      data=>{
        this.reminderLoop(data)
       

        }
    )
  }
  public reminderLoop(data){
    let currentTime=new Date();
    let messageIme=new Date(data.start);
    let takeDifferece=messageIme.getTime()-currentTime.getTime();
    let minutes=takeDifferece/60000;
    if(data.alert==true && takeDifferece>0){
    const options = { closeButton: true, progressBar: true,timeOut:5000 , tapToDismiss: true};
    const alertInstance = this.toastr.success(`few minutes left to start meeting`,data.title, options);
    alertInstance.onTap.subscribe(() => {
      data.alert=false;
      this.socket.stopReminder(data);
    });
    alertInstance.onHidden.subscribe(() => {
      setTimeout(()=>{
        this.reminderLoop(data)
      },3000)
    });
  }
  }
 
  public messageFromAdmin(){
    this.socket.messageFromAdmin(this.userInfo.userId).subscribe(
      data=>{
        if(data['status']==200){
          this.toastr.success(data['message']);
          
          this.events=[];
        this.getAllEvents();
        }
        
      }
    )
  }
  public getAllEvents(){
    this.testService.getAllMessage(this.userInfo.userId).subscribe(
      data=>{
        if(data['status']==200){
        for(let event of data['data']){
          event.start=new Date(event.start);
          event.end=new Date(event.end);
          this.events.push(event);
          this.refresh.next();
        }
        }
        else{
          this.toastr.warning(data['message'])
        }
      }
    )
  }
  public LogOut(){
    this.testService.logout().subscribe(
      data=>{
        if(data.status==200){
        Cookie.delete('authToken');
        Cookie.delete('loggedInUser');
        this.testService.deleteUserInfoInLocalStorage()
        this.toastr.success(data.message);

        this.socket.disconnect();

          setTimeout(()=>{
            this.router.navigate(['/']);
          },2000)
        }else{
          this.router.navigate(['/']);

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
  


  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();


  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = true;


  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

}
