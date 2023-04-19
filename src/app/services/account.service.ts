import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private client:HttpClient) { }

  getAccount(id:number){
    return this.client.get("https://localhost:44309/api/Account/"+id)
  }
  getAccounts(){
    return this.client.get("https://localhost:44309/api/Account/")
  }

  createAccount(account:any){
    return this.client.post("https://localhost:44309/api/Account/",account)
  }

  updateAccount(account:any){
    return this.client.put("https://localhost:44309/api/Account/" + account.accountId,account)
  }

}
