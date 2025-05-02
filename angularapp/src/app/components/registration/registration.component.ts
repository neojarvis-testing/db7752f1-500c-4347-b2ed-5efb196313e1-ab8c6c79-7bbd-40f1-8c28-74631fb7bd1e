
// import { Component } from '@angular/core';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-registration',
//   templateUrl: './registration.component.html',
//   styleUrls: ['./registration.component.css']
// })
// export class RegistrationComponent {
//   user = {
//     username: '',
//     email: '',
//     password: '',
//     confirm_password: '',
//     mobile_number: '',
//     role: ''
//   };
//   userExists = false;

//   constructor(private router: Router) {}

//   checkFormValidity() {
//     const form = document.querySelector('form');
//     const registerButton = document.getElementById('registerButton') as HTMLButtonElement;
//     registerButton.disabled = !form.checkValidity();
//   }

//   onSubmit() {
//     // Simulate a check for existing user
//     if (this.user.email === 'existing@example.com') {
//       this.userExists = true;
//     } else {
//       this.userExists = false;
//       // Navigate to the login page upon successful registration
//       this.router.navigate(['/login']);
//     }
//   }
// }

import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  user:User = {
    email: '',
    password: '',
    userName: '',
    mobileNumber: '',
    userRole: ''
  };
  confirm_password:string = '';
  userExists = false;
  errorMessage: string ='';

  constructor(private _service:AuthService, private route : Router) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
        console.log("UserBefore Subscribe: ", this.user);
        this._service.register(this.user).subscribe(response => {
            // console.log("User registered successfully", response);
            this.route.navigate(['login']);
        }, (error) => {
            console.log('Registration failed', error); 
            if (error.status === 400 && error.error?.message) {
                this.errorMessage = error.error.message; 
            } else {
                this.errorMessage = 'An unexpected error occurred. Please try again.';
            }
        });
    } else {
        this.errorMessage = 'Invalid Password';
    }
}


  checkFormValidity() {
    this.userExists = false; 
  }
}
