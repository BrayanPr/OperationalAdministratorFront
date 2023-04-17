import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private client:HttpClient) { }

  auth(email:string, password:string){
    let body = {
      email,
      password
    }
    return this.client.post("https://localhost:44309/api/Users/login/", body)
  }
}
