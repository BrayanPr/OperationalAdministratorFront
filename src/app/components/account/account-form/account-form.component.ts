import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { AccountService } from 'src/app/services/account.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss']
})
export class AccountFormComponent {
  constructor(private service:AccountService, private tservice:TeamService){
    tservice.getTeams().subscribe({
      next: (res: any) => {
        console.log(res)
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

  @ViewChild('error')
  public readonly errorSwal!: SwalComponent;
  @ViewChild('success')
  public readonly successSwal!: SwalComponent;

  @Output() cancel = new EventEmitter<any>();

  @Output() create = new EventEmitter<any>();
  
  teams:any;
  customer_name:string = "";
  operational_manager:string = "";
  Name: string="";
  team:any=null;

  clear_form(){
    this.customer_name = ""
    this.operational_manager = ""
    this.Name = ""
    this.team = null
  }

  onSubmit(form: NgForm) {
    // handle form submission here
    console.log(form.value)
    
    if(!this.verifyForm(form.value)) this.errorSwal.fire()
    
    else this.service.createAccount(form.value).subscribe({
      next: (res: any) => {
        console.log(res)
        this.successSwal.fire()
        this.clear_form()
      },
      error: (err: any) => {
        console.log(err);
        this.errorSwal.text="Error saving the register"
        this.errorSwal.fire()
      },
      complete: () => {
        console.log('Observable completed');
      }
    });
  }

  onCancel() {
    this.cancel.emit();
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
