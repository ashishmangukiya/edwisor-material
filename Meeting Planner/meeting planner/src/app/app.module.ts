import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core'
import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import {RouterModule ,Routes } from '@angular/router';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { LogInComponent } from './user/log-in/log-in.component';
import { ResetPasswordComponent } from './user/reset-password/reset-password.component';
import { UserViewModule } from './user-view/user-view.module';
import { AdminViewModule } from './admin-view/admin-view.module';
import { FormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { SocketService } from './socket.service';
import { TestService } from './test.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    UserModule,
    AdminViewModule,
    UserViewModule,
    HttpClientModule,
    BrowserAnimationsModule, 
    FormsModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      {path:'sign-up',component:SignUpComponent},
      {path:'log-in',component:LogInComponent},
      {path:'forgot-password',component:ResetPasswordComponent},
      {path:'*',redirectTo:'log-in',pathMatch:'full'},
      {path:'**',redirectTo:'log-in',pathMatch:'full'},
      {path:'',redirectTo:'log-in',pathMatch:'full'},
      
    ])
  ],
  providers: [SocketService,TestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
