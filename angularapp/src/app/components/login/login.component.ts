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
    throw new Error('Method not implemented.');
  }

   loginModel: Login= {
     Email: '',
     Password: ''
   }; 
    
     constructor(private authService: AuthService, private router: Router) {} 

    
     login() { 
    
      this.authService.login(this.loginModel).subscribe( 
       response => { 
        console.log('Login successful', response); 
        const role = this.authService.getRole();
        this.router.navigate([role === 'Admin' ? '/admin/Home' : '/user/Home']);
       }, 
       error => { 
        console.log('Login failed', error); 
       } 
      ); 
    
     } 
    
    } 
