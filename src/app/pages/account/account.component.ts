import { Component } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {

  constructor(private service:AccountService, private tservice:TeamService){}

  action=""
  account:any = null
  search:any = null
  crud_options = [
    { name: 'Create', action: 'create'},
    { name: 'List', action: 'list'},
    { name: 'Search:', action: 'search'},
  ]
  render_action(action:string){
    if(action == "search"){
      
      if(this.search == null) return
      let aux = document.getElementById("search") as HTMLInputElement
      aux.value = "";
      this.service.getAccount(this.search).subscribe({
        next: (res: any) => {
          console.log(res);
          this.account = res
        },
        error: (err: any) => {
          console.log(err);
        },
        complete: () => {
          if(this.account.teamId != null){
            this.tservice.getTeam(this.account.teamId).subscribe(
              {
                next: (res: any) => {
                  this.account.team = res;
                },
                error: (err: any) => {
                  console.log(err);
                },
                complete: () => {
                  console.log('Observable completed');
                }
              }
            )
          }
          this.action = action
          this.search = null;
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
  create_account(account:any){
    this.search = account.accountId;
    this.render_action("search");
  }
}