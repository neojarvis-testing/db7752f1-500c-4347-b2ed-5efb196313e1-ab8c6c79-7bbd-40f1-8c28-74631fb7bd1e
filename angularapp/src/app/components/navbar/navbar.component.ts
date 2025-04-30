import { Component, OnInit, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isHomePage: boolean = false;

  constructor(private router: Router) {}

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
    const navbar = document.getElementById('mainNavbar');
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
    this.isHomePage = currentRoute === '/' || currentRoute.startsWith('/home');

    const navbar = document.getElementById('mainNavbar');
    if (!navbar) return;

    if (!this.isHomePage) {
      navbar.classList.add('static');
    } else {
      navbar.classList.remove('static');
    }
  }

}