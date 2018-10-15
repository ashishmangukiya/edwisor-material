import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SocketService } from './socket.service';
import { ListService } from './list.service';
import { AuthModule } from './auth/auth.module';
import {RouterModule} from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './auth/login/login.component';
import { UserModule } from './user/user.module';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports:[
    BrowserModule,
    MatInputModule,
    AuthModule,
    UserModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(), 
    RouterModule.forRoot([
      {path:'login',component:LoginComponent},
      {path:'*',redirectTo:'login',pathMatch:'full'},
      {path:'**',redirectTo:'login',pathMatch:'full'},

    ])
  ],
  providers: [SocketService,ListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
