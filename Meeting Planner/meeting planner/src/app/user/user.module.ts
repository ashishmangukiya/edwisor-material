import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LogInComponent } from './log-in/log-in.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RouterModule, Routes } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { EmailVerifyComponent } from './email-verify/email-verify.component';
import { AdminEmailVerifyComponent } from './admin-email-verify/admin-email-verify.component';
import { InfoComponent } from './info/info.component';
@NgModule({
  imports: [
    CommonModule,
    ToastrModule,
    FormsModule,

    RouterModule.forChild([
      {path:'email-verify/user/:userId/:secretKey',component:EmailVerifyComponent},
      {path:'email-verify/admin/:adminId/:secretKey',component:AdminEmailVerifyComponent},
      {path:'info',component:InfoComponent}
    ]),
  ],
  declarations: [SignUpComponent, LogInComponent, ResetPasswordComponent, EmailVerifyComponent, AdminEmailVerifyComponent, InfoComponent]
})
export class UserModule { }
