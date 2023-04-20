import { Component, Input, ViewChild } from '@angular/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent {

  constructor (private service:UserService) {}
  @ViewChild('error')
  public readonly errorSwal!: SwalComponent;
  @ViewChild('success')
  public readonly successSwal!: SwalComponent;
  is_editing = false;
  EnglishLevels = ["A1","A2","B1","B2","C1","C2"]
  @Input('profile') profile = {
                    "userId": 0,
                    "name": "",
                    "email": "",
                    "cv": "",
                    "experience":"",
                    "englishLevel":"",
                    "teamId":0,
                    "team":{
                      "name":"",
                      "description":""
                    }
                  }

    editMode(){
      this.is_editing = !this.is_editing
      if(!this.is_editing){
        this.service.getUser(this.profile.userId).subscribe({
          next: (res: any) => {
            this.profile = res
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

    verifyForm(form:any){
      let message = "";
      
      let isValid = false;
      
      if( this.isNullOrEmpty(form.name)) message = "Name cannot be empty";

      else if( form.name.length > 50) message = "Name cannot be longer than 50 characters"
      
      else isValid = true

      this.errorSwal.text = message;      

      return isValid

    }

    saveChanges(){
      this.profile = {
        userId: this.profile.userId,
        name: this.profile.name,
        email: this.profile.email,
        cv: this.profile.cv,
        experience: this.profile.experience,
        englishLevel: this.profile.englishLevel,
        teamId : this.profile.teamId,
        team:this.profile.team
      }
      if(!this.verifyForm(this.profile)){
        this.errorSwal.fire()
      }
      this.service.updateUser(this.profile).subscribe({
        next: (res: any) => {
          this.successSwal.fire()
          this.is_editing = false
        },
        error: (err: any) => {
          console.log(err);
        },
        complete: () => {
          console.log('Observable completed');
        }
      })
    }
    isNullOrEmpty(value:string){
      return (value == "" || value == null)
    }
  
}