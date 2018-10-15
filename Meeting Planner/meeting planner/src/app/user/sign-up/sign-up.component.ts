import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TestService } from '../../test.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
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
  public countryCodes: string[];
  public countryCode:string;
  public countryName:string;

  constructor(public testService: TestService, public router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.getCountries();
    this.getCountryCodes();
  }
  public goToInfo: any = () => {
    this.router.navigate(['/info']);
  }
  public getCountries(){
    this.testService.getCountryNames()
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
        });//end sort
      })//end subscribe
      
  }//end getCountries
  public getCountryCodes(){
    this.testService.getCountryNumbers()
      .subscribe((data) => {
        this.countryCodes = data;
      })//end subscribe
  }//end getCountries
  public onChangeOfCountry(){

    this.countryCode = this.countryCodes[this.country];
    this.countryName = this.allCountries[this.country];
  }//end onChangeOfCountry

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
    else if(this.checked){
      let data = {
        firstName: this.firstName,
        userName:this.firstName+'-admin',
        country:this.country,
        lastName: this.lastName,
        mobileNumber: `${this.countryCode}${this.mobileNumber}`,
        email: this.email,
        password: this.password,
      }
 
      this.testService.signUpAdmin(data)
        .subscribe((apiResponse) => {

          if (apiResponse.status == 200) {
            this.status=apiResponse.status;
            this.toastr.success('You are registered Successfully');
            setTimeout(() => {
              this.goToInfo();
            }, 1000);
          }
          else {
            this.toastr.error(apiResponse.message);
          }
        },
        (err)=>{
          this.toastr.error(err.error.message);
        });

    }
    else {
      let data = {
        firstName: this.firstName,
        lastName: this.lastName,
        country:this.country,
        mobileNumber:`${this.countryCode}${this.mobileNumber}`,
        email: this.email,
        password: this.password,
      }
      this.testService.signUp(data)
        .subscribe((apiResponse) => {

          if (apiResponse.status == 200) {
            this.status=apiResponse.status;
            this.toastr.success('You are registered Successfully');
            setTimeout(() => {
              this.goToInfo();
            }, 1000);
          }
          else {
            this.toastr.error(apiResponse.message);
          }
        },
        (err)=>{
          this.toastr.error(err.error.message);
        });

    }//End condition
  }//End signup function
}

