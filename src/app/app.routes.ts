import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ChartComponentComponent } from './core/components/dashboard/chart-component/chart-component.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },  
    { path: 'login', component: LoginComponent },
];
