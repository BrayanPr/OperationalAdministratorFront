import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.scss']
})
export class TeamFormComponent {
  constructor(private service:TeamService){}

  @ViewChild('error')
  public readonly errorSwal!: SwalComponent;
  @ViewChild('success')
  public readonly successSwal!: SwalComponent;

  @Output() cancel = new EventEmitter<any>();

  @Output() create = new EventEmitter<any>();
  
  Name: string="";
  Description: string="";

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

  clearForm(){
    this.Name = ""
    this.Description = ""
  }

  onSubmit(form: NgForm) {
    // handle form submission here
    console.log(form.value)
    
    if(!this.verifyForm(form.value)) this.errorSwal.fire()

    else this.service.createTeam(form.value).subscribe({
      next: (res: any) => {
        this.successSwal.fire()
        // this.create.emit(res)
      },
      error: (err: any) => {
        console.log(err);
        this.errorSwal.text="Error saving the register"
        this.errorSwal.fire()
      },
      complete: () => {
        this.clearForm()
      }
    });
  }

  onCancel() {
    this.cancel.emit();
  }
}
