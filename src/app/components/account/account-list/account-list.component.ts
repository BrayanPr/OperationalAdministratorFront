import { Component, EventEmitter, Output } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent {
  @Output() cancel = new EventEmitter<any>();
  accounts = [
    {
      accountId:"",
      accountName :"",
      customerName:"",
      operationManagerName:"",
      teamId:"",
      team:{
        name:""
      }
    }
  ]
  constructor (private service:AccountService, private tservice:TeamService) {
    service.getAccounts().subscribe({
      next: (res: any) => {
        this.accounts = res; 
        console.log(res)
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        this.accounts.map((account:any) => {
          tservice.getTeam(account.teamId).subscribe({
            next: (res: any) => {
              account.team = res; 
              console.log(res)
            },
            error: (err: any) => {
              console.log(err);
            },
            complete: () => {}
          })
        })
        console.log('Observable completed');
      }
    })
  }
  onCancel() {
    this.cancel.emit();
  }
}
