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
  HttpErrorResponse,
} from '@angular/common/http';
import { TokenService } from '../../service/token.service';
import { LoginRespone } from '../../responses/user/login.response';
import { RoleService } from '../../service/role.service';
import { Role } from '../../models/role';

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

  roles: Role[] = []; // Mảng roles
  rememberMe: boolean = true;
  selectedRole: Role | undefined; // Biến để lưu giá trị được chọn từ dropdown

  constructor(
    private router: Router,
    private userService: UserService,
    private tokenService: TokenService,
    private roleService: RoleService
  ) {}

  ngOnInit() {
    debugger;
    this.roleService.GetRoles().subscribe({
      next: (role: Role[]) => {
        debugger;
        this.roles = role;
        this.selectedRole = role.length > 0 ? role[0] : undefined;
      },
      error: (error: any) => {
        debugger;
        if (error instanceof HttpErrorResponse) {
          console.error('HTTP Error:', error.status);
          console.error('Error Details:', error.error);               
        }
      },
    });
  }
  onPhoneNumberChange() {
    console.log('phone number is:' + this.phoneNumber);
  }
  Login() {
    const loginDTO: LoginDTO = {
      phone_number: this.phoneNumber,
      password: this.password,
      role_id: this.selectedRole?.id ?? 1
    };
    this.userService.Login(loginDTO).subscribe({
      next: (response: LoginRespone) => {
        
        //this.router.navigate(['/home']);
        const { token } = response;       
        if (this.rememberMe) {
          this.tokenService.setToken(token);
        } 
        alert('Login success!');
      },
      complete: () => {
        
      },
      error: (error: any) => {       
        if (error instanceof HttpErrorResponse) {
          console.error('HTTP Error:', error.status);
          console.error('Error Details:', error.error);               
        }
      },
    });
  }
}
