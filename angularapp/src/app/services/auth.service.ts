import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Login } from '../models/login.model';
import { User } from '../models/user.model';
// import jwtDecode from 'jwt-decode';



@Injectable({

  providedIn: 'root'

})

export class AuthService {

  public apiUrl = 'https://8080-ffbccfbdadbaaafbbebbabccbbdfcfbbde.premiumproject.examly.io';

  private tokenKey = 'authToken';
  private userRoleSubject = new BehaviorSubject<string | null>(null);
  private userIdSubject = new BehaviorSubject<number | null>(null);
  userRole$ = this.userRoleSubject.asObservable();
  userId$ = this.userIdSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) { }
  
  register(user: User): Observable<any> {
    return this.http.post<Login>(`${this.apiUrl}/api/register`, user);
  }

  login(loginData: Login): Observable<any> {
    return this.http.post<Login>(`${this.apiUrl}/api/login`, loginData).pipe(
      tap((response: any) => {
        if (response.token) {
          const decodedToken: any = this.decodeToken(response.token);
          console.log("----",decodedToken);

          // Storing key in Local Storage 
          localStorage.setItem(this.tokenKey, response.token);

          
          const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
          const userName = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];

          localStorage.setItem('role', role);
          localStorage.setItem('UserName', userName);
          
          this.userRoleSubject.next(role);
          // this.router.navigate(['']);
          // this.userIdSubject.next(decodedToken.id);
        }
      })
    );
  }

  decodeToken(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(atob(base64));
    } catch (error) {
      console.error('Invalid token', error);
      return null;
    }
  }
  
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.userRoleSubject.next(null);
    this.userIdSubject.next(null);
    this.router.navigate(['/auth/login']);

  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
  getRole(): string {
    return localStorage.getItem('role') || '';
  }
  
  // isLoggedIn(): boolean {
  
  //   return !!localStorage.getItem('token');
  
  // }
  

}