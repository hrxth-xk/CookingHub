import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookingClass } from '../models/cooking-class.model';
import { CookingClassRequest } from '../models/cooking-class-request.model';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
 
@Injectable({ providedIn: 'root' })
export class CookingClassService {
  public apiUrl = environment.apiUrl; // This will be set from environment.ts


  
  
  constructor(private http: HttpClient, private auth: AuthService) {}
 
  private getHeaders(): HttpHeaders {
    const token = this.auth.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
 
  getAllCookingClasses(): Observable<CookingClass[]> {
    return this.http.get<CookingClass[]>(`${this.apiUrl}/api/cookingClass`, { headers: this.getHeaders() });
  }
 
  getCookingClassById(classId: string): Observable<CookingClass> {
    return this.http.get<CookingClass>(`${this.apiUrl}/api/cookingClass/${classId}`, { headers: this.getHeaders() });
  }
 
  addCookingClass(cooking: CookingClass): Observable<string> {
    return this.http.post(`${this.apiUrl}/api/cookingClass`, cooking, { headers: this.getHeaders(), responseType: 'text' });
  }
  updateCookingClass(classId: string, cooking: CookingClass): Observable<string> {
    return this.http.put(`${this.apiUrl}/api/cookingClass/${classId}`, cooking, { headers: this.getHeaders(), responseType: 'text' });
  }
 
  deleteCookingClass(classId: string): Observable<string> {
    return this.http.delete(`${this.apiUrl}/api/cookingClass/${classId}`, { headers: this.getHeaders(), responseType: 'text' });
  }
 
  getAllCookingClassRequests(): Observable<CookingClassRequest[]> {
    return this.http.get<CookingClassRequest[]>(`${this.apiUrl}/api/cookingClassRequest`, { headers: this.getHeaders() });
  }
 
  getCookingClassRequestsByUserId(userId: string): Observable<CookingClassRequest[]> {
    return this.http.get<CookingClassRequest[]>(`${this.apiUrl}/api/cookingClassRequest/user/${userId}`, { headers: this.getHeaders() });
  }
 
  addCookingClassRequest(request: CookingClassRequest): Observable<string> {
    return this.http.post(`${this.apiUrl}/api/cookingClassRequest`, request, {
      headers: this.getHeaders(),
      responseType: 'text'          // ✅ Tells Angular to expect plain text, not JSON
    });
  }
  updateCookingClassRequest(requestId: string, request: CookingClassRequest): Observable<string> {
    return this.http.put(`${this.apiUrl}/api/cookingClassRequest/${requestId}`, request, { headers: this.getHeaders(), responseType: 'text' });
  }
 
  deleteCookingClassRequest(requestId: string): Observable<string> {
    return this.http.delete(`${this.apiUrl}/api/cookingClassRequest/${requestId}`, { headers: this.getHeaders(), responseType: 'text' });
  }

  sendChatMessage(message: string): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/api/chat`,
      { message },
      { headers: this.getHeaders() }
    );
  }
}
