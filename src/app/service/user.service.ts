import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterDTO } from '../dtos/users/register.dto';
import { LoginDTO } from '../dtos/users/login.dto';
import {environment} from '../environment/environment' 
import { HttpUtilService } from './http.util.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private apiRegister = environment.apiBaseUrl+'/user/register'
  private apiLogin = environment.apiBaseUrl+'/user/login'
  private apiConfig = {
    headers :this.httpUtilService.createHeaders()
  }
  constructor(private http:HttpClient,private httpUtilService: HttpUtilService) { }

  Register(registerDto:RegisterDTO):Observable<any>{   
    return this.http.post(this.apiRegister,registerDto,this.apiConfig)
  }
  Login(loginDto:LoginDTO):Observable<any>{    
    return this.http.post(this.apiLogin,loginDto,this.apiConfig)
  }
}
