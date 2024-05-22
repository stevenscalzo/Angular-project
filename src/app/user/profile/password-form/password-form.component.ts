import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'password-form',
  standalone: true,
  imports: [MatTabsModule, ReactiveFormsModule, CommonModule, FontAwesomeModule],
  templateUrl: './password-form.component.html',
  styleUrl: './password-form.component.scss'
})
export class PasswordFormComponent {
  #fb = inject(NonNullableFormBuilder);
  activeModal = inject(NgbActiveModal);
  #userService = inject(UserService);
  toastr = inject(ToastrService);

  icons = { faFloppyDisk };

  errorMessage = '';

  passwordForm = this.#fb.group({
    password: ['', [Validators.required, Validators.minLength(4)]],
    password2: ['', [Validators.required, Validators.minLength(4)]]
  }, { validators: matchPassword })

  updatePassword(): void {
    const passwordControl = this.passwordForm.get('password');

    if (passwordControl) {
      this.#userService.savePassword(passwordControl.value).subscribe({
        next: () => {
          this.activeModal.close() 
          this.toastr.success('Contraseña actualidad correctamente', 'Cambio de contraseña');
        },
        error: () => { this.toastr.error('Error al actualizar la contraseña', 'Inicio de sesión'); }
      })
    }
  }

  validClasses(formControl: FormControl, validClass: string, errorClass: string) {
    return {
      [validClass]: formControl.touched && formControl.valid,
      [errorClass]: formControl.touched && formControl.invalid,
    };
  }
}

export function matchPassword(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const password2 = control.get('password2')?.value;
  return password === password2 ? null : { match: true };
}