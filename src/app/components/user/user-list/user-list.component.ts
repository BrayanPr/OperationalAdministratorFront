import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  @Output() cancel = new EventEmitter<any>();
  users = [
    {
      userId:"",
      name :"",
      email:""
    }
  ]
  constructor (private service:UserService) {
    service.getUsers().subscribe({
      next: (res: any) => {
        this.users = res; 
        console.log(res)
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        console.log('Observable completed');
      }
    })
  }
  onCancel() {
    this.cancel.emit();
  }
}
