// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { UserService } from 'src/app/services/userService/user.service';



// @Component({
//   selector: 'app-signup',
//   templateUrl: './signup.component.html',
//   styleUrls: ['./signup.component.scss']
// })
// export class SignupComponent implements OnInit {
//   signupForm !:FormGroup 
//   users:any

//   constructor(private formBuilder : FormBuilder,private userService: UserService) {}
  

//   ngOnInit(){
//     this.signupForm = this.formBuilder.group({
     
//       firstName: ['', Validators.required],
//       lastName: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(6)]],
//       confirmPassword: ['', Validators.required]

//   })

// }

// get signupControl() { return this.signupForm.controls; }
 
// handleSignup() {
//   if (this.signupForm.invalid) return;

//   const { firstname, lastname, email, password } = this.signupForm.value;

//   this.userService.signupApiCall({firstName: firstname, lastName: lastname, emailId: email, password: password})
//     .subscribe(
//       (      result: any) => {
//         console.log(result);

//       },
//       (      error: any) => {
//         console.log(error);
//         // Handle error response here
//       }
//     );

    
   

// }
  
// }

