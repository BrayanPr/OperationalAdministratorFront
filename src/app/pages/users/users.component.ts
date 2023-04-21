import { Component, ViewChild } from '@angular/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
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

  @ViewChild('error')
  public readonly errorSwal!: SwalComponent;
  
  action=""
  user:any = null
  search:any = null
  crud_options = [
    { name: 'Create', action: 'create'},
    { name: 'List', action: 'list'},
    { name: 'Search:', action: 'search'},
  ]

  render_action(action:string){
    if(action != "search") this.action = action;
    else
    {
      if(this.search == null) return
      let _aux = this.search
      this.search = null;
      let aux = document.getElementById("search") as HTMLInputElement
      aux.value = "";
      this.service.getUser(_aux).subscribe({
        next: (res: any) => {
          this.user = res
          this.action = action
        },
        error: (err: any) => {
          this.errorSwal.text = err.error.Message;
          this.errorSwal.fire();
        },
        complete: () => {
          if(this.user.teamId == null) return
          this.tservice.getTeam(this.user.teamId).subscribe({
            next:(res:any)=>{
              this.user.team = res;
            }
          })
        }
      })
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
