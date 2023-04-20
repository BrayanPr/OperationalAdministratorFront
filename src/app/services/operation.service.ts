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

  getHistoryByDates(startDate:Date, endDate:Date){
    let body = {
      startDate,
      endDate
    }
    return this.client.post("https://localhost:44309/api/Operational/history/date", body)
  }

  getHistoryByUser(userId:number){
    return this.client.get("https://localhost:44309/api/Operational/history/user?userId="+userId)
  }

  getHistoryByTeam(teamId:number){
    return this.client.get("https://localhost:44309/api/Operational/history/team?teamId="+teamId)
  }

}
