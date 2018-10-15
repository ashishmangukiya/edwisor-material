import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
@NgModule({
  imports: [
    CommonModule,
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
    RouterModule.forChild([
      {path:'admin-view/:userId',component:AdminViewComponent},
      {path:'admin-dashboard',component:AdminDashboardComponent},
       ])
  ],
  declarations: [AdminViewComponent, AdminDashboardComponent]
})
export class AdminViewModule { }
