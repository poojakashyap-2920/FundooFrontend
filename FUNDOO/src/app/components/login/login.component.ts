import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { error } from 'console';
import { UserService } from 'src/app/services/userService/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  host: {
    class: 'app-login-cnt'
  }
})
export class LoginComponent implements OnInit {
//password :string=""
 loginForm !:FormGroup 

  constructor(private formBuilder : FormBuilder, private router:Router , private userService: UserService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
     
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
      
  } )
  }

  get loginControls() { return this.loginForm.controls; }

  handleLogin() {
    //console.log(this.password);
    if(this.loginForm.invalid) return
    // console.log(this.loginForm.controls)
    //this.router.navigate(['/signup'])
    const {email, password } = this.loginForm.value
    
    this.userService.loginApiCall(email, password).subscribe(res =>{
      // console.log(res)
      this.router.navigate(['/dashboard/notes'])
      localStorage.setItem('authToken',res.data)

    }
    ,(err: any)=>console.log(err))

    
  }

}
