
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

  constructor(private _service:AuthService) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log("UserBefore Subscribe: ",this.user);
      // Handle form submission
      this._service.register(this.user).subscribe(response=>{
        console.log("User",this.user);
        console.log("response",response);
        
      }, (error)=>{
        console.log("Error", error);
        alert("User Already Exists");
      });
      console.log('Form Submitted!', this.user);
      // Reset form after submission
      //form.reset();
    } else {
      console.log('Form is invalid');
    }
  }

  checkFormValidity() {
    // Additional validation logic if needed
    this.userExists = false; // Reset userExists flag on input change
  }
}
