import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.scss']
})
export class TeamFormComponent {
  constructor(private service:TeamService){}

  @Output() cancel = new EventEmitter<any>();

  @Output() create = new EventEmitter<any>();
  
  Name: string="";
  Description: string="";

  onSubmit(form: NgForm) {
    // handle form submission here
    console.log(form.value)
    this.service.createTeam(form.value).subscribe({
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
