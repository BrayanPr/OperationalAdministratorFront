import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/services/auth/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    @ViewChild('swal')
    public readonly swal!: SwalComponent;
    email:any;
    password:any;

    constructor(private service:AuthService, private app:AppComponent, private router:Router ){
      if(localStorage.getItem("token")){
          router.navigate(['/'])
      }
    }

    onSubmit(){
      this.service.auth(this.email, this.password).subscribe((res:any)=>{
        if(res.token){
          localStorage.setItem('token', res.token);
          localStorage.setItem('role', res.role);
          this.app.is_loged_in=true;
          this.router.navigate(['/'])
        }
      },
      (error:any)=>{
        console.log(error)  
        this.swal.fire();
      })


    }
}
