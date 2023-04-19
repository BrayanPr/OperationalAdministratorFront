import { Component, EventEmitter, Output } from '@angular/core';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent {
  @Output() cancel = new EventEmitter<any>();
  teams = [
    {
      teamId:"",
      name :"",
      description:""
    }
  ]
  constructor (private service:TeamService) {
    service.getTeams().subscribe({
      next: (res: any) => {
        this.teams = res; 
        console.log(res)
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        console.log('Observable completed');
      }
    })
  }
  onCancel() {
    this.cancel.emit();
  }
}
