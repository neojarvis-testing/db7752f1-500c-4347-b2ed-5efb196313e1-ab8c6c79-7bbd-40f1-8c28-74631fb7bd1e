import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feedback } from '../models/feedback.model';
import { Observable,throwError } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { UserDTO } from '../models/user-dto.model';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
   apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  sendFeedback(feedback: Feedback): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/api/feedback`, feedback, { responseType: 'text' as 'json' }).pipe(
      catchError(this.handleError)
    );
  }
  
 
  getAllFeedbacksByUserId(userId: number): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.apiUrl}/api/feedback/${userId}`).pipe(
      catchError(this.handleError)
    );
  }

  deleteFeedback(feedbackId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/api/feedback/${feedbackId}`, { responseType: 'text' as 'json' }).pipe(
      catchError(this.handleError)
    );
  }

  getFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.apiUrl}/api/feedback`).pipe(
      catchError(this.handleError)
    );
  }

  getUserDetailsById(userId: number): Observable<UserDTO> {
    return this.http.get<UserDTO>(`${this.apiUrl}/api/feedback/user/${userId}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
