import { Component } from '@angular/core';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  constructor(private service:UserService,private tservice:TeamService){

  }

  action=""
  user:any = null
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
      this.service.getUser(this.search).subscribe({
        next: (res: any) => {
          console.log(res);
          this.search = null;
          this.user = res
          this.action = action
        },
        error: (err: any) => {
          console.log(err);
        },
        complete: () => {
          this.tservice.getTeam(this.user.teamId).subscribe({
            next:(res:any)=>{
              this.user.team = res;
            }
          })
        }
      })
    }else{
      this.action = action;
    }

  }
  cancel_action(){
    this.action = "";
  }
  create_user(user:any){
    this.search = user.userId;
    this.render_action("search");
  }
}
