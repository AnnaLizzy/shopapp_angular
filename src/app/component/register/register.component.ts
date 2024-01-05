import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { RegisterDTO } from '../../dtos/users/register.dto';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,HeaderComponent,FooterComponent,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  @ViewChild('registerForm') registerForm!:NgForm
  phoneNumber: string;
  password:string
  retypePassword :string
  fullname:string
  address:string
  dateOfBirth:Date
  isAccepted:boolean
  constructor(private router: Router, private userService: UserService){
    this.phoneNumber=''
    this.password=''
    this.retypePassword=''
    this.fullname=""
    this.address=''
    this.dateOfBirth= new Date()
    this.dateOfBirth.setFullYear(this.dateOfBirth.getFullYear() - 18)
    this.isAccepted=false
  }

 
  onPhoneChange(){
    console.log('Phone typed : '+this.phoneNumber)
  }

  register(){
   
    const registerDTO:RegisterDTO = {
      "fullname": this.fullname,
      "phone_number": this.phoneNumber,
      "address": this.address,
      "password": this.password,
      "retype_password": this.retypePassword,
      "date_of_birth": this.dateOfBirth,
      "facebook_account_id": 0,
      "google_account_id": 0,
      "role_id": 1
  }

    this.userService.Register(registerDTO).subscribe({
      next: (response: any) => {
        debugger
        this.router.navigate(['/login']);          
      },
      complete: () => {
        debugger
      },
      error: (error: any) => {          
        alert(`Cannot register, error: ${error.error}`)          
      }
  })   
  }
  checkPasswordMatch(){
    if(this.password !== this.retypePassword){
      this.registerForm.form.controls['retypePassword'].setErrors({'passwordMismatch':true})
    }else{
      this.registerForm.form.controls['retypePassword'].setErrors(null)
    }
  }
}