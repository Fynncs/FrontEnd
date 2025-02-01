import { provideRouter, RouterModule, Routes, withDebugTracing } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ChartComponentComponent } from './core/components/dashboard/chart-component/chart-component.component';
import { HomeComponent } from './home/home.component';
import { ApplicationConfig, NgModule } from '@angular/core';
import { ExpenseCardComponent } from './core/components/dashboard/expense-card/expense-card.component';
import { CadastroDespesaComponent } from './cadastro-despesa/cadastro-despesa.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'cadastro-despesas', component: CadastroDespesaComponent,  data: { title: 'Cadastrar Despesas'  }},
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
];
export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes, withDebugTracing())]
}