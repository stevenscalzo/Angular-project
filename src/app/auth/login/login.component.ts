import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserLogin } from '../../interfaces/user';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  #fb = inject(NonNullableFormBuilder);
  #authService = inject(AuthService);
  activeModal = inject(NgbActiveModal);
  toastr = inject(ToastrService);

  errorMessage = '';

  loginForm = this.#fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  loginUser() {
    const loginUser: UserLogin = {
      ...this.loginForm.getRawValue()
    }

    this.#authService.login(loginUser).subscribe({
      next: () => { 
        this.activeModal.close();
        this.toastr.success('Ha iniciado sesión, !Bienvendio!', 'Inicio de sesión');
      },
      error: () => { 
        this.toastr.error('Error en el login', 'Inicio de sesión');
      }
    })
  }

  validClasses(formControl: FormControl, validClass: string, errorClass: string) {
    return {
      [validClass]: formControl.touched && formControl.valid,
      [errorClass]: formControl.touched && formControl.invalid,
    };
  }
}
