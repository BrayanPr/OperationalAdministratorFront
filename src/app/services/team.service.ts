import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private client:HttpClient, private app:AppComponent) { }

  getTeam(teamId:number){
    return this.client.get(this.app.master_url + "Team/"+teamId)
  }

  getTeams(){
    return this.client.get(this.app.master_url + "Team/")
  }
  createTeam(body:any){
    return this.client.post(this.app.master_url + "Team/", body)
  }
  updateTeam(team:any){
    return this.client.put(this.app.master_url + "Team/" + team.teamId, team)
  }
}
