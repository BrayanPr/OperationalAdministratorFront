import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private client:HttpClient, private app:AppComponent) { }

  getProfile(){
    return this.client.get(this.app.master_url + "Users/GetProfile")
  }

  createUser(body:any){
    return this.client.post(this.app.master_url + "Users/create",body)
  }

  getUsers(){
    return this.client.get(this.app.master_url + "Users/all")
  }

  getUser(id:number){
    return this.client.get(this.app.master_url + "Users/" + id)
  }
  updateUser(new_user:any){
    return this.client.put(this.app.master_url + "Users/" + new_user.userId, new_user)
  }
}
