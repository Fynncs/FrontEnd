import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://your-backend.com/api/login'; 

  constructor(private router: Router, private http: HttpClient) {}

  /**
   * Makes the login request to the backend and saves the token.
   * @param email - User's email.
   * @param password - User's password.
   * @returns Observable with the backend response.
   */
  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post(this.apiUrl, body);
  }

  /**
   * Saves the token in localStorage after successful authentication.
   * @param token - Token generated after successful authentication.
   */
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  /**
   * Removes the token and ends the user's session.
   */
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  /**
   * Checks if the user is authenticated.
   * @returns boolean
   */
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token; 
  }

  /**
   * Retrieves the stored token.
   * @returns string | null
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * Decodes user information from the token (optional).
   * @returns any
   */
  getUserInfo(): any {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = token.split('.')[1]; 
      return JSON.parse(atob(payload));
    } catch (error) {
      console.error('Error decoding the token:', error);
      return null;
    }
  }
}
