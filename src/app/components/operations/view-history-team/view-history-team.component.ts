import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { OperationService } from 'src/app/services/operation.service';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-history-team',
  templateUrl: './view-history-team.component.html',
  styleUrls: ['./view-history-team.component.scss']
})
export class ViewHistoryTeamComponent {
  @Output() cancel = new EventEmitter<any>();
  @ViewChild('error')
  public readonly errorSwal!: SwalComponent;
  @ViewChild('success')
  public readonly successSwal!: SwalComponent;

  startDate:Date= new Date();

  endDate:Date = new Date();

  selectedTeam=0;

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
        this.errorSwal.text=err.error.Message;
        this.errorSwal.fire();
      }
    })
    
    tservice.getTeams().subscribe({
      next: (res:any) => {
        this.teams = res
      },
      error: (err:any) => {
        this.errorSwal.text=err.error.Message;
        this.errorSwal.fire();
      }
    })

    service.getHistory().subscribe({
      next: (res:any) => {
        console.log(res)
        this.history = res
      },
      error: (err:any) => {
        this.errorSwal.text=err.error.Message;
        this.errorSwal.fire();
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

  searchByTeam(){
    this.service.getHistoryByTeam(this.selectedTeam).subscribe({
      next: (res:any) => {
        this.history = res;
      }, 
      error : (err:any) => {
        this.errorSwal.text=err.error.Message;
        this.errorSwal.fire();
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
