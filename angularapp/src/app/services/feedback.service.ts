import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feedback } from '../models/feedback.model';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environments.prod';
 
@Injectable({ providedIn: 'root' })
export class FeedbackService {
  public apiUrl = environment.apiUrl; // This will be set from environment.ts
 
  constructor(private http: HttpClient, private auth: AuthService) {}
 
  private getHeaders(): HttpHeaders {
    const token = this.auth.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
 
  sendFeedback(feedback: Feedback): Observable<string> {
    return this.http.post(`${this.apiUrl}/api/feedback`, feedback, { headers: this.getHeaders(), responseType: 'text' });
  }
 
  getAllFeedbacksByUserId(userId: number): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.apiUrl}/api/feedback/user/${userId}`, { headers: this.getHeaders() });
  }
 
  deleteFeedback(feedbackId: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/api/feedback/${feedbackId}`, { headers: this.getHeaders(), responseType: 'text' });
  }
 
  getFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.apiUrl}/api/feedback`, { headers: this.getHeaders() });
  }
}