import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OperationService {

  constructor(private client:HttpClient) { }

  moveUser(userID:number, teamID:number){
    let body = {
      userID,
      teamID
    }
    return this.client.post("https://localhost:44309/api/Operational/move", body)
  }

  getHistory(){
    return this.client.get("https://localhost:44309/api/Operational/history")
  }

}
