import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class OperationService {

  constructor(private client:HttpClient, private app:AppComponent) { }

  moveUser(userID:number, teamID:number){
    let body = {
      userID,
      teamID
    }
    return this.client.post(this.app.master_url + "Operational/move", body)
  }

  getHistory(){
    return this.client.get(this.app.master_url + "Operational/history")
  }

  getHistoryByDates(startDate:Date, endDate:Date){
    let body = {
      startDate,
      endDate
    }
    return this.client.post(this.app.master_url + "Operational/history/date", body)
  }

  getHistoryByUser(userId:number){
    return this.client.get(this.app.master_url + "Operational/history/user?userId="+userId)
  }
  getHistoryByUserName(userName:string){
    return this.client.get(this.app.master_url + "Operational/history/user/"+userName)
  }
  getHistoryByTeam(teamId:number){
    return this.client.get(this.app.master_url + "Operational/history/team?teamId="+teamId)
  }

}
