import { Component, Input, ViewChild } from '@angular/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
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
      }
    })
  }
  
  @ViewChild('error')
  public readonly errorSwal!: SwalComponent;
  @ViewChild('success')
  public readonly successSwal!: SwalComponent;
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
      if(!this.verifyForm(this.account)) this.errorSwal.fire()
      else this.service.updateAccount(this.account).subscribe({
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
    verifyForm(form:any){
      let message = ""
      let isValid = false
      if(this.isNullOrEmpty(form.accountName)) message = "Name cannot be empty"
  
      else if(this.isNullOrEmpty(form.customerName)) message = "Customer name cannor be empty"
  
      else if(this.isNullOrEmpty(form.operationManagerName)) message = "Operational manager name cannot be empty"
  
      else if(form.teamId == null || form.teamId < 1 ) message = "Team is not valid"
  
      else isValid = true
  
      this.errorSwal.text = message
  
      return isValid
    }
  
    isNullOrEmpty = (string:string) => (string == null || string == "")
}
