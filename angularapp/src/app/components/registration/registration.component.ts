
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

import { HttpErrorResponse } from '@angular/common/http';
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
  user: User = {
    email: '',
    password: '',
    userName: '',
    mobileNumber: '',
    userRole: ''
  };
  confirm_password: string = '';
  userExists = false;
  errorMessage: string = '';
  adminCode: string = '';

  constructor(private _service: AuthService, private route: Router) { }

  onSubmit(form: NgForm) {
    if (
      this.user.email &&
      this.user.password &&
      this.user.userName &&
      this.user.mobileNumber &&
      this.user.userRole
    ) {
      if (this.user.userRole === 'Admin') {
        if (this.adminCode === 'QP10WO') {
          console.log('Admin login');
          this._service.register(this.user).subscribe(
            (response) => {
              // console.log("User registered successfully", response);
              this.route.navigate(['login']);
            },
            (error) => {
              console.log('Registration failed', error);
              if (error.status === 400 && error.error?.message) {
                this.errorMessage = error.error.message;
              } else {
                this.errorMessage = 'An unexpected error occurred. Please try again.';
              }
            }
          );
        } else {
          this.errorMessage = 'Incorrect Code, Please try again.';
        }
      } else {
        this._service.register(this.user).subscribe(
          (response) => {
            // console.log("User registered successfully", response);
            this.route.navigate(['login']);
          },
          (error : HttpErrorResponse ) => {
            console.log('Registration failed', error);
            if (error.status === 400 && error.error?.message) {
              this.errorMessage = error.error.message;
            } else {
              this.errorMessage = 'An unexpected error occurred. Please try again.';
            }
          }
        );
        console.log('UserBefore Subscribe: ', this.user);
      }
    } else {
      // this.errorMessage = 'Try a different password with at least 6 characters, including a special character and a number.';

    }
  }
  isValidEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }
  
  
  checkFormValidity() {
      this.userExists = false;
    }
  }
