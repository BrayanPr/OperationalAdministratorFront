import { Component } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  action=""
  crud_options = [
    { name: 'Create', action: 'create'}
  ]

  render_action(action:string){
    this.action = action;  
    console.log(this.action);
  }
  cancel_action(){
    this.action = "";
  }
}
