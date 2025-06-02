import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomePage } from './home-page/home-page';
import { LoginComponent } from './login-component/login-component';
import { RegisterComponent } from './register-component/register-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomePage, LoginComponent, RegisterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  protected title = 'Actly.Client';
}
