import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule, NgForm } from '@angular/forms';
import { LoginDTO } from '../../dtos/users/login.dto';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import {
  HttpBackend,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { TokenService } from '../../service/token.service';
import { LoginRespone } from '../../responses/user/login.response';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    FormsModule,
    HttpClientModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  @ViewChild('loginForm') loginForm!: NgForm;
  phoneNumber: string = '11223344';
  password: string = '11223344';

  

  constructor(
    private router: Router,
    private userService: UserService,
    private tokenService: TokenService,
    
  ) {}

  onPhoneNumberChange() {
    console.log('phone number is:' + this.phoneNumber);
  }
  Login() {
    const message = 'phone ' + this.phoneNumber + 'pass' + this.password;

    const loginDTO: LoginDTO = {
      phone_number: this.phoneNumber,
      password: this.password,
    };
    this.userService.Login(loginDTO).subscribe({
      next: (response: LoginRespone) => {
        debugger;
        //this.router.navigate(['/login']);
        const { token } = response;
        this.tokenService.setToken(token);
        alert('Login success!');
      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        alert(`Cannot login, error: ${error.error}`);
      },
    });
  }
}
