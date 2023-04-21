import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from 'src/app/app.component';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private client:HttpClient, private app:AppComponent) { }

  auth(email:string, password:string){
    let body = {
      email,
      password
    }
    return this.client.post(this.app.master_url + "Users/login/", body)
  }
}
