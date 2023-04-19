import { Component, Input } from '@angular/core';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-team-view',
  templateUrl: './team-view.component.html',
  styleUrls: ['./team-view.component.scss']
})
export class TeamViewComponent {
  constructor (private service:TeamService) {}

  is_editing = false;

  @Input('team') team = {
                    "teamId": 0,
                    "name": "",
                    "description": "",
                  }

    editMode(){
      this.is_editing = !this.is_editing
      if(!this.is_editing){
        this.service.getTeam(this.team.teamId).subscribe({
          next: (res: any) => {
            this.team = res
          },
          error: (err: any) => {
            console.log(err);
          },
          complete: () => {
            console.log('Observable completed');
          }
        })
      }
    }

    saveChanges(){
      this.service.updateTeam(this.team).subscribe({
        next: (res: any) => {
          console.log(this.team)
          this.is_editing = false
        },
        error: (err: any) => {
          console.log(err);
        },
        complete: () => {
          console.log('Observable completed');
        }
      })
    }
}
