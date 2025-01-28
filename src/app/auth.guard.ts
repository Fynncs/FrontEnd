import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './core/components/auth/service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

/**
 * Method that checks if the user is authenticated.
 * If authenticated, allows access to the route.
 * Otherwise, redirects to the login page.
 * @param next - Snapshot of the activated route.
 * @param state - State of the route.
 * @returns Observable<boolean> or Promise<boolean> or boolean
 */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/login']); 
      return false;
    }
  }
}
