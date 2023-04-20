import { Component, EventEmitter, Output } from '@angular/core';
import { OperationService } from 'src/app/services/operation.service';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-history-user',
  templateUrl: './view-history-user.component.html',
  styleUrls: ['./view-history-user.component.scss']
})
export class ViewHistoryUserComponent {
  @Output() cancel = new EventEmitter<any>();

  startDate:Date= new Date();

  endDate:Date = new Date();

  selectedUser=0;

  users:Array<{ userId: number; name: string; }>=[{
    name:"",
    userId:0
  }]

  teams:Array<{ teamId: number; name: string; }>=[{
    name:"",
    teamId:0
  }]

  history = [
    {
      userId:0,
      user:{
        userId:0,
        name:"",
      },
      newTeam:0,
      newTeamObj:{
        teamId:0,
        name:""
      },

      oldTeam:0,
      oldTeamObj:{
        teamId:0,
        name:""
      },
      date:new Date()
    }
  ]

  constructor(private service:OperationService, private uservice:UserService, private tservice:TeamService){
    uservice.getUsers().subscribe({
      next: (res:any) => {
        this.users = res
      },
      error: (err:any) => {
        console.log(err)
      }
    })
    
    tservice.getTeams().subscribe({
      next: (res:any) => {
        this.teams = res
      },
      error: (err:any) => {
        console.log(err)
      }
    })

    service.getHistory().subscribe({
      next: (res:any) => {
        console.log(res)
        this.history = res
      },
      error: (err:any) => {
        console.log(err)
      },
      complete:() => {
        this.history.forEach(element => {
          const newTeam = this.teams.find(team => team.teamId === element.newTeam);
          element.newTeamObj = newTeam || { teamId: -1, name: "None" };

          const oldTeam = this.teams.find(team => team.teamId === element.oldTeam);
          element.oldTeamObj = oldTeam || { teamId: -1, name: "None" };

          const user = this.users.find(user => user.userId === element.userId);
          element.user = user || { userId: -1, name: "None" };
        });
        console.log("finished")
      }
    })
  }

  searchByUser(){
    this.service.getHistoryByUser(this.selectedUser).subscribe({
      next: (res:any) => {
        console.log(res)
        this.history = res;
      }, 
      error : (err:any) => {
        console.log(err)
      },
      complete : () => {
        this.history.forEach(element => {
          const newTeam = this.teams.find(team => team.teamId === element.newTeam);
          element.newTeamObj = newTeam || { teamId: -1, name: "None" };

          const oldTeam = this.teams.find(team => team.teamId === element.oldTeam);
          element.oldTeamObj = oldTeam || { teamId: -1, name: "None" };

          const user = this.users.find(user => user.userId === element.userId);
          element.user = user || { userId: -1, name: "None" };
        })
      }
    })
  }

  onCancel(){
    this.cancel.emit()
  }
}
