import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SocketService } from '../../socket.service';
import { ListService } from '../../list.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public firstName: any;
  public lastName: any;
  public mobileNumber: any;
  public email: any;
  public password: any;
  public checked=false;
  public status;
  public country: string;
  public allCountries:any;
  public countries:any[]=[];
  public countryCodes;
  public countryCode:string;
  public countryName:string;

  constructor(public toastr:ToastrService,public route:Router,public socket:SocketService,public list:ListService) { }

  ngOnInit() {
    this.getCountries();
    this.getCountryCodes();
  }
  public goToInfo: any = () => {
    this.route.navigate(['/info']);
  }
  public getCountries(){
    this.list.getCountryNames()
      .subscribe((data) => {
        this.allCountries = data;
        for( let i in data){

          let singleCountry = {
             name:data[i],
             code : i
          }
          this.countries.push(singleCountry);
        }
        this.countries = this.countries.sort((first, second)=>{
          return first.name.toUpperCase() < second.name.toUpperCase() ? -1 :( first.name.toUpperCase() > second.name.toUpperCase()? 1 :0 ) ; 
        });
      })
      
  }
  public getCountryCodes(){
    this.list.getCountryNumbers()
      .subscribe((data) => {
        this.countryCodes = data;
      })
  }
  public onChangeOfCountry(){

    this.countryCode = this.countryCodes[this.country];
    this.countryName = this.allCountries[this.country];
  }

  public signUpFunction: any = () => {
    if (!this.firstName) {
      this.toastr.warning("Enter First Name");
    }
    else if (!this.lastName) {
      this.toastr.warning("Enter Last Name");
    }
    else if (!this.mobileNumber) {
      this.toastr.warning("Enter Mobile Number");
    }
    else if (!this.email) {
      this.toastr.warning("Enter Email Address");
    }
    else if (!this.password) {
      this.toastr.warning("Enter Password");
    }
    else {
      let data = {
        firstName: this.firstName,
        country:this.country,
        lastName: this.lastName,
        mobileNumber: `${this.countryCode}${this.mobileNumber}`,
        email: this.email,
        password: this.password,
      }
 
      this.list.signUp(data)
        .subscribe((apiResponse) => {

          if (apiResponse['status'] == 200) {
            this.status=apiResponse['status'];
            this.toastr.success('You are registered Successfully');
            setTimeout(() => {
              this.goToInfo();
            }, 1000);
          }
          else {
            this.toastr.error(apiResponse['message']);
          }
        },
        (err)=>{
          this.toastr.error(err.error.message);
        });

    }
  }//End signup function

}
