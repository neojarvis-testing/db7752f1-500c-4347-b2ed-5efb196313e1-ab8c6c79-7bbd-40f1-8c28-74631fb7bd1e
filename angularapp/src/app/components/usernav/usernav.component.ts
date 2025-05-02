  import { Component, HostListener, OnInit } from '@angular/core';
  import { NavigationEnd, Router } from '@angular/router';
  import { AuthService } from 'src/app/services/auth.service';

  @Component({
    selector: 'app-usernav',
    templateUrl: './usernav.component.html',
    styleUrls: ['./usernav.component.css']
  })
  export class UsernavComponent implements OnInit {

    isHomePage: boolean = false;
    constructor(private router: Router, private service : AuthService) {}
    ngOnInit(): void {
      this.checkCurrentRoute();

      
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.checkCurrentRoute();
        }
      });
    }

    @HostListener('window:scroll', [])
    onWindowScroll() {
      const navbar = document.getElementById('userNavbar');
      if (!navbar) return;

      if (this.isHomePage) {
        if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
          navbar.classList.remove('static');
        } else {
          navbar.classList.remove('scrolled');
          navbar.classList.remove('static');
        }
      } else {
        navbar.classList.add('static');
        navbar.classList.remove('scrolled');
      }
    }

    checkCurrentRoute() {
      const currentRoute = this.router.url;
      this.isHomePage = currentRoute === '/user/home';
      const navbar = document.getElementById('userNavbar');
      if (!navbar) return;
      if (!this.isHomePage) {
        navbar.classList.add('static');
      } else {
        navbar.classList.remove('static');
      }
    }

    
    logout() {
      console.log('Logging out...');
      this.service.logout();
    }

  }
