import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule,Routes } from '@angular/router';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import { RegionComponent } from './region/region.component';
import { RegionViewComponent } from './region-view/region-view.component';
import { ServiceService } from './service.service';
import {HttpClientModule,HttpErrorResponse } from '@angular/common/http';
import { CountryViewComponent } from './country-view/country-view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import {NgxPaginationModule} from 'ngx-pagination';
@NgModule({
  declarations: [
    AppComponent,
    RegionComponent,
    RegionViewComponent,
    CountryViewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    ToastrModule.forRoot(),
    FormsModule,
    RouterModule.forRoot([
      {path:'regions' ,component:RegionComponent },
      {path:'region/:regionName',component:RegionViewComponent },
      {path:'country/:countryCode', component:CountryViewComponent },
      {path:'' ,redirectTo:'regions',pathMatch:'full' },
      {path:'*' ,redirectTo:'regions',pathMatch:'full' },
      {path:'**',redirectTo:'regions',pathMatch:'full' }
    ])
  ],
  providers: [ServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
