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
    return this.client.post("https://localhost:44309/api/Users/create",body)
  }

  getUsers(){
    return this.client.get("https://localhost:44309/api/Users/all")
  }

  getUser(id:number){
    return this.client.get("https://localhost:44309/api/Users/" + id)
  }
  updateUser(new_user:any){
    return this.client.put("https://localhost:44309/api/Users/" + new_user.userId, new_user)
  }
}
