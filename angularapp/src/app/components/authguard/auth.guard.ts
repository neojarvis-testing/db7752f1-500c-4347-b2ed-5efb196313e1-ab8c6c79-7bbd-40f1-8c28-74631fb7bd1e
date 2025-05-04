import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isLoggedIn = this.authService.isLoggedIn();
    const expectedRole = route.data['expectedRole'];  
    const userRole = this.authService.getRole(); 

    if (!isLoggedIn) {
      this.router.navigate(['/login']);
      return false;
    }

    if (expectedRole && userRole !== expectedRole) {
      this.authService.logout(); 
      return false;
    }

    return true;
  }
}
