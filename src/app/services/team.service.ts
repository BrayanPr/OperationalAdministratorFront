import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private client:HttpClient) { }

  getTeam(teamId:number){
    return this.client.get("https://localhost:44309/api/Team/"+teamId)
  }

  getTeams(){
    return this.client.get("https://localhost:44309/api/Team/")
  }
  createTeam(body:any){
    return this.client.post("https://localhost:44309/api/Team/", body)
  }
  updateTeam(team:any){
    return this.client.put("https://localhost:44309/api/Team/" + team.teamId, team)
  }
}
