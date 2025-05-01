import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feedback } from '../models/feedback.model';
import { Observable,throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import { UserDTO } from '../models/user-dto.model';
 
@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
   apiUrl : string = "https://8080-ffbccfbdadbaaafbbebbabccbbdfcfbbde.premiumproject.examly.io";
 
  constructor(private http: HttpClient, private authService: AuthService) {}
  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }

  sendFeedback(feedback: Feedback): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/api/feedback`, feedback, { headers: this.getHeaders(), responseType: 'text' as 'json' }).pipe(
      catchError(this.handleError)
    );
  }
  getAllFeedbacksByUserId(userId: number): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.apiUrl}/api/feedback/user/${userId}`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }
 
  deleteFeedback(feedbackId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/api/feedback/${feedbackId}`, { headers: this.getHeaders(), responseType: 'text' as 'json'  }).pipe(
      catchError(this.handleError)
    );
  }
  getFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.apiUrl}/api/feedback`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  getUserDetailsById(userId: number): Observable<UserDTO> {
    return this.http.get<UserDTO>(`${this.apiUrl}/api/feedback/user/${userId}`,{ headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }
  
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
 
