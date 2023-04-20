import { Component, Input, ViewChild } from '@angular/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-team-view',
  templateUrl: './team-view.component.html',
  styleUrls: ['./team-view.component.scss']
})
export class TeamViewComponent {
  constructor (private service:TeamService) {}

  @ViewChild('error')
  public readonly errorSwal!: SwalComponent;
  @ViewChild('success')
  public readonly successSwal!: SwalComponent;

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
    if(!this.verifyForm(this.team)) this.errorSwal.fire()
    
    else this.service.updateTeam(this.team).subscribe({
      next: (res: any) => {
        console.log(this.team)
        this.is_editing = false
        this.successSwal.fire()
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        console.log('Observable completed');
      }
    })
  }
  verifyForm(form:any){
    let message = ""
    let isValid = false

    if(this.isNullOrEmpty(form.name)) message = "Name cannot be empty"

    else if(form.name.length > 50) message = "Name cannot be longer than 50 characters"

    else if(this.isNullOrEmpty(form.description)) message = "Description cannot be empty"

    else if(form.description.length > 50) message = "Description cannot be longer than 50 characters"
    
    else isValid = true

    this.errorSwal.text = message

    return isValid
  }

  isNullOrEmpty(string:string){
    return (string==null || string == "");
  }

}
