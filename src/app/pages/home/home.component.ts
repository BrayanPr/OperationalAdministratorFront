import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  profile = {
    "userId": 0,
    "name": "",
    "email": "",
    "cv": "",
    "experience":""
  }
  constructor(private service:UserService){
    service.getProfile().subscribe((res:any)=>{
      this.profile = res
      console.log(res)
    })
  }
}
