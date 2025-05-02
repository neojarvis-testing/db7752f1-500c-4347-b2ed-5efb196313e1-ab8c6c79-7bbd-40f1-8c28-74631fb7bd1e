import { ChangeDetectorRef, Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  activeNavbar: string = 'app'; 
  title: any;
  constructor(private authService: AuthService, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.authService.userRole$.subscribe(role => {
      this.updateNavbar();
      this.cdRef.detectChanges();  
    });
 
  }

  updateNavbar() {
    if (this.authService.isLoggedIn()) {
      const role = this.authService.getRole();
      console.log("navbar checking",role);
      if (role === 'Admin') {
        console.log("Admin login");
        this.activeNavbar = 'admin';
      } else if (role === 'User') {
        console.log("user login");
        this.activeNavbar = 'user';
      }
    } else {
      console.log("Default");
      this.activeNavbar = 'app';
    }
  }
 } 