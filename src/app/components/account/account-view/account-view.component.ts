import { Component, Input } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-account-view',
  templateUrl: './account-view.component.html',
  styleUrls: ['./account-view.component.scss']
})
export class AccountViewComponent {
  constructor (private service:AccountService, private tservice:TeamService) {
    tservice.getTeams().subscribe({
      next: (res: any) => {
        this.teams = res
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        console.log('Observable completed');
      }
    })
  }
  teams=[{
    name:"",
    teamId:"",
  }]
  is_editing = false;

  @Input('account') account = {
                    "accountId": 0,
                    "accountName":"",
                    "customerName": "",
                    "operationManagerName": "",
                    "teamId":null,
                    "team":{
                      "name":"",
                      "description":""
                    }
                  }

    editMode(){
      this.is_editing = !this.is_editing
      if(!this.is_editing){
        this.service.getAccount(this.account.accountId).subscribe({
          next: (res: any) => {
            this.account = res
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
      console.log(this.account)
      this.service.updateAccount(this.account).subscribe({
        next: (res: any) => {
          console.log(this.account)
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
