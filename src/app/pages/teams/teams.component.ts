import { Component, ViewChild } from '@angular/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { TeamService } from 'src/app/services/team.service';
@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent {

  constructor(private service:TeamService){}

  @ViewChild('error')
  public readonly errorSwal!: SwalComponent;
  

  action=""
  team:any = null
  search:any = null
  crud_options = [
    { name: 'Create', action: 'create'},
    { name: 'List', action: 'list'},
    { name: 'Search:', action: 'search'},
  ]
  render_action(action:string){
    if(action != "search"){
      this.action = action;
    }
    else{
      if(this.search == null) return
      let aux = document.getElementById("search") as HTMLInputElement
      aux.value = "";
      let _aux = this.search;
      this.search = null;
      this.service.getTeam(_aux).subscribe({
        next: (res: any) => {
          this.team = res
          this.action = action
        },
        error: (err: any) => {
          this.errorSwal.text = err.error.Message;
          this.errorSwal.fire();
        }
      })
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
