import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  @Output() cancel = new EventEmitter<any>();

  @Output() create = new EventEmitter<any>();
  
  teams:any;
  customer_name:string = "";
  operational_manager:string = "";
  Name: string="";
  team:any=null;

  onSubmit(form: NgForm) {
    // handle form submission here
    console.log(form.value)
    this.service.createAccount(form.value).subscribe({
      next: (res: any) => {
        console.log(res)
        this.create.emit(res)
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        console.log('Observable completed');
      }
    });
  }

  onCancel() {
    this.cancel.emit();
  }
}
