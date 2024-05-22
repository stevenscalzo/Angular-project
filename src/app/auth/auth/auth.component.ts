import { Component, inject } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { MatTabsModule } from '@angular/material/tabs';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'auth',
  standalone: true,
  imports: [LoginComponent, MatTabsModule, RegisterComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
}
