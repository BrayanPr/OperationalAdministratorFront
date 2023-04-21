import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component';
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private client:HttpClient, private app:AppComponent) { }

  getAccount(id:number){
    return this.client.get(this.app.master_url + "Account/"+id)
  }
  getAccounts(){
    return this.client.get(this.app.master_url + "Account/")
  }

  createAccount(account:any){
    return this.client.post(this.app.master_url + "Account/",account)
  }

  updateAccount(account:any){
    return this.client.put(this.app.master_url + "Account/" + account.accountId,account)
  }

}
