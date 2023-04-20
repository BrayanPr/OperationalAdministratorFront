import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
  
  
  @ViewChild('error')
  public readonly errorSwal!: SwalComponent;
  @ViewChild('success')
  public readonly successSwal!: SwalComponent;
  constructor(private service:UserService){}
  error:string="";

  @Output() cancel = new EventEmitter<any>();

  @Output() create = new EventEmitter<any>();
  EnglishLevels = ["A1","A2","B1","B2","C1","C2"]
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
    if(!this.verifyForm(form.value)) this.errorSwal.fire()
    else this.service.createUser(form.value).subscribe({
      next: (res: any) => {
        this.successSwal.fire()
        this.clearForm()
        // this.create.emit(res)
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
  clearForm(){
    this.Name="";
    this.password ="";
    this.confirmPassword = "";
    this.Email = ""
    this.cv = ""
    this.experience = ""
    this.englishLevel = ""
    this.role = "user"
  }

  verifyForm(form:any){
    let message = ""
    
    let isValid = false;
    
    if(this.isNullOrEmpty(form.Name)) message = "Name cannot be empty"

    else if(form.Name.length > 50) message = "Name cannot be longer than 50 characters"

    else if(this.isNullOrEmpty(form.Email)) message = "Email cannot be empty"
    
    else if( !this.isEmailValid(form.Email)) message = "Email format is not valid"

    else if(this.isNullOrEmpty(form.password)) message = "Password cannot be empty"
    
    else if(!this.isPasswordValid(form.password)) message = "Password must contain at least one uppercase letter, one lowercase letter, and one digit."
    
    else if(form.password.length < 8) message = "Password must be longer than 8 characters"

    else if(form.password != form.confirmPassword){
      message = "Please make sure the passwords match"
      console.log(form.password, form.confirmPassword)
    } 
    
    else if(this.isNullOrEmpty(form.role)) message = "User rol cannot be empty"
    
    else isValid=true;
    
    this.errorSwal.text = message
    
    return isValid
  }
  isEmailValid(email:string) {
    // Define regular expression for email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Check if the email matches the regular expression
    const isMatch = emailRegex.test(email);
    
    // Return true if the email is valid, false otherwise
    return isMatch;
  }

  isPasswordValid(password:string) {
    // Define regular expressions for uppercase letters, lowercase letters, and digits
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const digitRegex = /\d/;
    
    // Check if the password contains at least one uppercase letter, one lowercase letter, and one digit
    const containsUppercase = uppercaseRegex.test(password);
    const containsLowercase = lowercaseRegex.test(password);
    const containsDigit = digitRegex.test(password);
    
    // Return true if the password meets all the requirements, false otherwise
    return containsUppercase && containsLowercase && containsDigit;
  }
  isNullOrEmpty(value:string){
    return (value == "" || value == null)
  }

  onCancel() {
    this.cancel.emit();
  }
}
