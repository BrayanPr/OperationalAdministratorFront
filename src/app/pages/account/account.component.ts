import { Component, ViewChild } from '@angular/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { AccountService } from 'src/app/services/account.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {

  constructor(private service:AccountService, private tservice:TeamService){}
  @ViewChild('error')
  public readonly errorSwal!: SwalComponent;
  
  action=""
  account:any = null
  search:any = null
  crud_options = [
    { name: 'Create', action: 'create'},
    { name: 'List', action: 'list'},
    { name: 'Search:', action: 'search'},
  ]
  render_action(action:string){
    if(action != "search")  this.action = action;
    else{
      if(this.search == null) return
      let aux = document.getElementById("search") as HTMLInputElement
      aux.value = "";
      let _aux = this.search
      this.search = null
      this.service.getAccount(_aux).subscribe({
        next: (res: any) => {
          this.account = res
          this.action = action
        },
        error: (err: any) => {
          this.errorSwal.text = err.error.Message;
          this.errorSwal.fire();
        }
      })
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
