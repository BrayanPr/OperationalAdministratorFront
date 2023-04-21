import { Component } from '@angular/core';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  profile = {
    "userId": 0,
    "name": "",
    "email": "",
    "cv": "",
    "experience":"",
    "englishLevel":"",
    "teamId":0,
    "team":{
      "name":"",
      "description":""
    }
  }
  constructor(private service:UserService, private tservice:TeamService){
    service.getProfile().subscribe({
      next : (res:any)  => {
        this.profile = res
      },
      error : (err:any) => {

      },
      complete : () => {
        if(this.profile.teamId == null) return
        else tservice.getTeam(this.profile.teamId).subscribe({
          next:(res:any)=>{
            this.profile.team = res;
          }
        })
      }
    })
  }
}
