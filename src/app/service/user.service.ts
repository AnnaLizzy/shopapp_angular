import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterDTO } from '../dtos/users/register.dto';
import { LoginDTO } from '../dtos/users/login.dto';
import {environment} from '../environment/environtment' 

@Injectable({
  providedIn: 'root'
})


export class UserService {
  private apiRegister = environment.apiBaseUrl+'/user/register'
  private apiLogin = 'http://localhost:8088/api/v1/user/login'
  private apiConfig = {
    headers :this.createHeader()
  }
  constructor(private http:HttpClient) { }
  private createHeader():HttpHeaders {
    return new HttpHeaders( {'Content-Type':'application/json',
    'Accept-Language':'vi'
   })
      }  
  Register(registerDto:RegisterDTO):Observable<any>{   
    return this.http.post(this.apiRegister,registerDto,this.apiConfig)
  }
  Login(loginDto:LoginDTO):Observable<any>{    
    return this.http.post(this.apiLogin,loginDto,this.apiConfig)
  }
}
