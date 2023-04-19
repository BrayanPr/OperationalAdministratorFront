import { Component } from '@angular/core';
import { TeamService } from 'src/app/services/team.service';
@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent {

  constructor(private service:TeamService){}

  action=""
  team:any = null
  search:any = null
  crud_options = [
    { name: 'Create', action: 'create'},
    { name: 'List', action: 'list'},
    { name: 'Search:', action: 'search'},
  ]
  render_action(action:string){
    if(action == "search"){
      
      if(this.search == null) return
      let aux = document.getElementById("search") as HTMLInputElement
      aux.value = "";
      this.service.getTeam(this.search).subscribe({
        next: (res: any) => {
          console.log(res);
          this.search = null;
          this.team = res
          this.action = action
        },
        error: (err: any) => {
          console.log(err);
        },
        complete: () => {
          console.log('Observable completed');
        }
      })
    }else{
      this.action = action;
    }

  }
  cancel_action(){
    this.action = "";
  }
  create_team(team:any){
    this.search = team.teamId;
    this.render_action("search");
  }
}
