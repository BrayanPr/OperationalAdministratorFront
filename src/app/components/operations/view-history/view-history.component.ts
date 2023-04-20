import { Component, EventEmitter, Output } from '@angular/core';
import { OperationService } from 'src/app/services/operation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-history',
  templateUrl: './view-history.component.html',
  styleUrls: ['./view-history.component.scss']
})
export class ViewHistoryComponent {
  
  @Output() cancel = new EventEmitter<any>();

  history = [
    {
      userId:0,
      user:{
        name:""
      },
      newTeam:"",
      oldTeam:"",
      date:""
    }
  ]

  constructor(private service:OperationService, private uservice:UserService){
    service.getHistory().subscribe({
      next: (res:any) => {
        console.log(res)
        this.history = res
      },
      error: (err:any) => {
        console.log(err)
      },
      complete:() => {
        this.history.forEach(element => {
          uservice.getUser(element.userId).subscribe({
            next: (res:any) => {
              element.user = res
            },
            error: (err:any) => {
              console.log(err)
            },
            complete: ()=> {
              
            }
          })
        });
        console.log("finished")
      }
    })
  }

  onCancel(){
    this.cancel.emit()
  }

}
