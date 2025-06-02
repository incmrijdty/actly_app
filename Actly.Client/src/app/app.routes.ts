import { Routes } from '@angular/router';
import { HomePage } from './home-page/home-page'
import { RegisterComponent } from './register-component/register-component';
import { LoginComponent } from './login-component/login-component';

export const routes: Routes = [
    { path: '', component: HomePage },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
];
