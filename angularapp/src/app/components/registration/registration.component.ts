
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  user = {
    username: '',
    email: '',
    password: '',
    confirm_password: '',
    mobile_number: '',
    role: ''
  };
  userExists = false;

  constructor(private router: Router) {}

  checkFormValidity() {
    const form = document.querySelector('form');
    const registerButton = document.getElementById('registerButton') as HTMLButtonElement;
    registerButton.disabled = !form.checkValidity();
  }

  onSubmit() {
    // Simulate a check for existing user
    if (this.user.email === 'existing@example.com') {
      this.userExists = true;
    } else {
      this.userExists = false;
      // Navigate to the login page upon successful registration
      this.router.navigate(['/login']);
    }
  }
}