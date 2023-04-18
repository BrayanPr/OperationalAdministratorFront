import { Component, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
  
  constructor(private service:UserService){}

  @Output() cancel = new EventEmitter<any>();

  Name: string="";
  Email: string="";
  password: string="";
  confirmPassword: string="";
  role: string = 'user';
  cv: string="";
  experience: string="";
  englishLevel: string="";

  onSubmit(form: NgForm) {
    // handle form submission here
    console.log(form.value);
    this.service.createUser(form.value).subscribe({
      next: (res: any) => {
        console.log(res);
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
