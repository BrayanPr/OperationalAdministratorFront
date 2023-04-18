import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private client:HttpClient) { }

  getProfile(){
    return this.client.get("https://localhost:44309/api/Users/GetProfile")
  }

  createUser(body:any){
    return this.client.post("https://localhost:44309/api/Users/",body)
  }

  getUsers(){
    return this.client.get("https://localhost:44309/api/Users/")
  }

}
