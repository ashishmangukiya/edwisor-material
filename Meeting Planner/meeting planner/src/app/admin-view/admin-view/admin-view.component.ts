import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { Observable, Subscriber } from 'rxjs';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { TestService } from '../../test.service';
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
  isToday
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';
import { SocketService } from '../../socket.service';
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
  selector: 'app-admin-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers:[ SocketService],
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {
  public adminUserName;
  public userId;
  public userInfo=[];
  public adminInfo;
  public eventList;
  public description;
  public event;
  public count=0;
  public userList;
  public currentEvent;
  constructor(private modal: NgbModal,public socket:SocketService,public testService:TestService,public toastr:ToastrService,public router:Router,public route:ActivatedRoute) {}

  ngOnInit() {
    this.userId=this.route.snapshot.paramMap.get('userId');
    this.getUserDetail();
    this.verifyAdmin();    

    this.getOnlineUserList();
    this.adminInfo=this.testService.getAdminInfoFromLocalstorage();
   // console.log(this.adminInfo);
  //  console.log(this.adminInfo.email)
    this.adminUserName=this.adminInfo.userName;
  //  console.log(this.userId);
    this.getAllEvents();
    this.stopReminder();
    this.getErrors();
  }
  public verifyAdmin(){
    this.socket.verify().subscribe(
      data=>{
   //     console.log('verified admin');
        this.socket.setAdmin();
      }
    )
  }
  public stopReminder(){
    this.socket.notificationFromUser(this.adminInfo.adminId).subscribe(
      data=>{
        if(data.status==200){
          this.events=[];
          this.getAllEvents();
        }
      }
    )
  }
  public getUserDetail(){
    this.testService.getUserDetail(this.userId).subscribe(
      data=>{
        if(data['status']==200){
          this.userInfo=data['data'];
     //     console.log(this.userInfo)
        }
        
      }
    )
  }
  public getErrors(){
    this.socket.getErrors().subscribe(
      data=>{
        if(data.status==500){
          this.toastr.warning(data.message);
        }
      }
    )    
  }
  public getReminder(){
    let currentTime=new Date();
    for(let meeting of this.events){
      let flag=false;
        if(isToday(meeting.start) && meeting['alert']==false){
            let difference=meeting.start.getTime()-currentTime.getTime();
          if(difference>0  && difference<180000){
            for(let user in this.userList){
              if(user==this.userId){
        //        console.log(difference);
                meeting['alert']=true;
                this.toastr.success(`reminder for "${meeting.title}" has been sent to ${meeting.userName}`)
                this.socket.sendReminder(meeting);
        //        console.log(meeting);
                flag=true;
              }
            }
            if(flag==false){
            this.socket.sendReminderOffline(meeting);
     //       console.log(meeting);
            }    

                  
          }
        }
      }
    }
  
  public getAllEvents(){
    let data={
      adminId:this.adminInfo.adminId,
      userId:this.userId
    }
    this.testService.getAllEvents(data).subscribe(
      data=>{
        if(data['status']==200){
        for(let event of data['data']){
         //     console.log(event);
              event.start=new Date(event.start);
              event.end=new Date(event.end);
              this.events.push(event);   
            this.refresh.next();      
        }
        setTimeout(()=>{
          this.getReminder();
        },2000);

      }
    }
    )
  }
  public getOnlineUserList(){
    this.socket.getAllOnlineUserList().subscribe(
      data=>{
  this.userList=data;
//  console.log(this.userList);        
      }
    )

  }
public openNav(){
    document.getElementById("mySidenav").style.width = "250px";
}

public closeNav() {
    document.getElementById("mySidenav").style.width = "0";
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

  @ViewChild('modalContent')
  modalContent: TemplateRef<any>;
  events: CalendarEvent[]=[];

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  refresh: Subject<any> = new Subject();


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
    this.sendToUSer(event);
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }
 

  addEvent(): void {
    this.event={
      title: 'New event',
      userId:this.userId,
      description:this.description,
      userName:this.userInfo[0].firstName,
      userEmailId:this.userInfo[0].email,
      adminId:this.adminInfo.adminId,
      color:colors.red,
      adminUserName:this.adminUserName,
      start:new Date(),
      end: endOfDay(new Date()),
      alert:false,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    };
    this.refresh.next();
  //console.log(this.event);    
 

  }
  public dynamic(event){
  //  console.log(event)
    this.currentEvent=event;

  }
  public sendToUSer(event){
 //   console.log(event)

    if(event.messageId){
      event.alert=false;
this.toastr.success('meeting schedule has been modified and sent to '+event.userName );

      this.socket.messageToUser(event);
      this.events=[];
      setTimeout(()=>{
        this.getAllEvents();

      },500)
    }
    else{
      this.toastr.success('meeting schedule has been sent to '+event.userName);
      this.socket.messageToUser(event);
      this.events=[];
      setTimeout(()=>{
        this.getAllEvents();

      },500)
    }
  }
  public deleteEvent(event){
      this.toastr.success(` "${event.title}" schedule has been deleted `);
   //   console.log(event);
      this.socket.deleteEvent(event);
      this.events=[];
      setTimeout(()=>{
        this.getAllEvents();

      },500)  
   
  }

}
