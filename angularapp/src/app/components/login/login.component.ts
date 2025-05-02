import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  ngOnInit(): void {
    
  }

   loginModel: Login= {
     Email: '',
     Password: ''
   }; 
    
   errorMessage: string = '';
     constructor(private authService: AuthService, private router: Router) {} 
     login() { 
      console.log(this.loginModel);
      
      this.authService.login(this.loginModel).subscribe( 
        response => { 
          console.log('Login successful', response); 
          const role = this.authService.getRole();
          this.router.navigate([role === 'Admin' ? '/admin/dashboard' : '/user/home']);
        }, 
        error => { 
          console.log('Login failed', error); 
          if (error.status === 401) {
            this.errorMessage = error.error?.message || 'Incorrect email or password';
          } else {
            this.errorMessage = 'An unexpected error occurred. Please try again.';
          }
        } 
      ); 
    }
    
    } 
