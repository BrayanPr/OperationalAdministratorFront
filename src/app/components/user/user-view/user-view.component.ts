import { Component, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent {

  constructor (private service:UserService) {}

  is_editing = false;

  @Input('profile') profile = {
                    "userId": 0,
                    "name": "",
                    "email": "",
                    "cv": "",
                    "experience":"",
                    "englishLevel":""
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

    saveChanges(){
      this.service.updateUser(this.profile).subscribe({
        next: (res: any) => {
          console.log(this.profile)
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
}