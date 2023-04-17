import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/services/auth/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    
    email:any;
    password:any;

    constructor(private service:AuthService, private app:AppComponent, private router:Router ){
      if(localStorage.getItem("token")){
          router.navigate(['/home'])
      }
    }

    onSubmit(){
      this.service.auth(this.email, this.password).subscribe((res:any)=>{
        if(res.token){
          localStorage.setItem('token', res.token);
          this.app.is_loged_in=true;
          this.router.navigate(['/home'])
        }
      },
      (error:any)=>{
        console.log(error)
      })


    }
}
