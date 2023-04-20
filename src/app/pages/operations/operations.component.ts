import { Component } from '@angular/core';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.scss']
})
export class OperationsComponent {

  constructor(private uservice:UserService, private tservice:TeamService){}

  action=""
  crud_options = [
    { name: 'Move user', action: 'move'},
    { name: 'View history', action: 'list'},
  ]
  render_action(action:string){
    
      this.action = action;
    

  }
  cancel_action(){
    this.action = "";
  }

}
