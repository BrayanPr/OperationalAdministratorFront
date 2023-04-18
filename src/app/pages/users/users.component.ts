import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  constructor(private service:UserService){

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
      this.service.getUser(this.search).subscribe({
        next: (res: any) => {
          console.log(res);
          this.user = res
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
  create_user(user:any){
    this.search = user.userId;
    this.render_action("search");
  }
}
