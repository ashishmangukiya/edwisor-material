import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { VerifyAccountComponent } from './verify-account/verify-account.component';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { InfoComponent } from './info/info.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule, 
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(), 
    RouterModule.forChild([
      {path:'signup',component:SignupComponent},
      {path:'verify/:userId/:secretId',component:VerifyAccountComponent},
      {path:'forgot-password',component:ForgotPasswordComponent},
      {path:'info',component:InfoComponent}
    ])
  ],
  declarations: [LoginComponent, SignupComponent, VerifyAccountComponent, ForgotPasswordComponent, InfoComponent]
})
export class AuthModule { }
