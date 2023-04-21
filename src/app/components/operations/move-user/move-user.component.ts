import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { OperationService } from 'src/app/services/operation.service';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-move-user',
  templateUrl: './move-user.component.html',
  styleUrls: ['./move-user.component.scss']
})
export class MoveUserComponent {
  @Output() cancel = new EventEmitter<any>();
  constructor (private uservice:UserService, private tservice:TeamService, private service:OperationService){
    tservice.getTeams().subscribe({
      next: (res: any) => {
        this.teams = res;
      },
      error: (err: any) => {
        this.errorSwal.text=err.error.Message;
        this.errorSwal.fire();
      },
      complete: () => {
      }
    })
  
    uservice.getUsers().subscribe({
      next: (res:any) => {
        this.users = res;
      },
      error: (err:any) => {
        this.errorSwal.text=err.error.Message;
        this.errorSwal.fire();
      },
      complete: () => {
      }
    })
  }
  
  @ViewChild('error')
  public readonly errorSwal!: SwalComponent;
  @ViewChild('success')
  public readonly successSwal!: SwalComponent;

  users = [{
    name:null,
    userId:null,
  }]

  teams = [{
    name:null,
    teamId:null
  }]

  userId:number = 0;
  teamId:number = 0;

  MoveUser(){
    console.log(this.userId,this.teamId)
      
    let form = {
      userId : this.userId,
      teamId : this.teamId
    }
    
    if(!this.verifyForm(form)) this.errorSwal.fire()
    else this.service.moveUser(this.userId,this.teamId).subscribe({
      next: (res:any)=>{
        this.successSwal.fire()
      },
      error: (err:any) => {
        this.errorSwal.text=err.error.Message;
        this.errorSwal.fire();
      },
      complete: () => {
      }
    })
  }

  verifyForm(form:any){
    let message = ""
    let isValid = false

    if(form.userId == null || form.userId < 1) message = "User is not valid"

    else if(form.teamId == null || form.teamId < 1 ) message = "Team is not valid"

    else isValid = true

    this.errorSwal.text = message

    return isValid
  }

  isNullOrEmpty = (value:any) => (value == null || value == "")

  onCancel(){
    this.cancel.emit()
  }

}
