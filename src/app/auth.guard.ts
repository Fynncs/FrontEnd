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
   * Método que verifica se o usuário está autenticado.
   * Se estiver autenticado, permite o acesso à rota.
   * Caso contrário, redireciona para a página de login.
   * @param next - Snapshot da rota ativada.
   * @param state - Estado da rota.
   * @returns Observable<boolean> ou Promise<boolean> ou boolean
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
