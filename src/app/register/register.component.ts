import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient,HttpClientModule,HttpHeaders } from '@angular/common/http';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,HeaderComponent,FooterComponent,FormsModule,HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  @ViewChild('registerForm') registerForm!:NgForm;
    phone : string
    password : string
    retypePassword : string
    fullname: string
    dateOfBirth: Date
    address:string
    isAccepted:boolean

    constructor(private http:HttpClient, private router:Router){
      this.phone = '0395017708'
      this.password='12345'
      this.retypePassword='12345'
      this.fullname='Anna'
      this.dateOfBirth= new Date()
      this.dateOfBirth.setFullYear(this.dateOfBirth.getFullYear() - 18)
      this.address='Địa chỉ test'
      this.isAccepted=false
    }
    onPhoneChange(){
      console.log('Phone Typed :'+ this.phone)
    }
    register(){
      const message = 'phone '+ this.phone +
                      ' pass ' + this.password +
                      ' retype pass ' + this.retypePassword +
                      ' fullname '+this.fullname + 
                      ' address '+this.address + 
                      ' isAccepted ' + this.isAccepted+
                      ' date of birth '+this.dateOfBirth
      const apiUrl = "http://localhost:8088/api/v1/user/register"
      const registerData = {
        "fullname": this.fullname,
        "phone_number": this.phone,
        "address": this.address,
        "password": this.password,
        "retype_password": this.retypePassword,
        "date_of_birth": this.dateOfBirth,
        "facebook_account_id": 0,
        "google_account_id": 0,
        "role_id": 1
      }
      const headers = new HttpHeaders({'Content-Type':'application/json'})
      this.http.post(apiUrl,registerData,{headers})
      .subscribe({
          next : (response:any) =>{
            debugger
            this.router.navigate(['/login'])
          },
          complete: () =>{
            debugger
          },
          error : (error:any) =>{
            
            alert('Cannot register : '+error)
           
          }
          
      }

      );
      
    }
    checkPasswordsMatch(){
      if(this.password !== this.retypePassword){
        this.registerForm.form.controls['retypePassword'].setErrors({'passwordMismatch':true})
      }else{
        this.registerForm.form.controls['retypePassword'].setErrors(null);
      }
    }
    checkAge(){
      if(this.dateOfBirth){
        const today = new Date();
        const birthDay = new Date(this.dateOfBirth);
        let age = today.getFullYear() - birthDay.getFullYear();
        const monthDiff = today.getMonth() - birthDay.getMonth();
        if(monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDay.getDate())){
          age--;
        }
        if(age >90){
          this.registerForm.form.controls['dateOfBirth'].setErrors({'invalidAges':true})
        }else{
          this.registerForm.form.controls['dateOfBirth'].setErrors(null)
        }
        if(age < 18){
          this.registerForm.form.controls['dateOfBirth'].setErrors({'invalidAge':true})
        }
        else{
          this.registerForm.form.controls['dateOfBirth'].setErrors(null)
        }
      }
    }
}
