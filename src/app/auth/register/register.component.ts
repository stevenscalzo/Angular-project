import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../interfaces/user';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  #fb = inject(NonNullableFormBuilder);
  activeModal = inject(NgbActiveModal);
  #authService = inject(AuthService);
  imageBase64: string = '';
  toastr = inject(ToastrService);

  registerForm = this.#fb.group({
    name: ['', [Validators.required]],
    emailGroup: this.#fb.group({
      email: ['', [Validators.required, Validators.email]],
      emailConfirm: ['', [Validators.required, Validators.email]]
    }, { validators: matchEmail }),
    password: ['', [Validators.required, Validators.minLength(4)]],
    avatar: ['', [Validators.required]]
  });

  resetImage(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    fileInput.value = '';
    this.imageBase64 = '';
    this.registerForm.get('avatar')?.setValue('');
  }

  changeImage(event: Event) {
    const fileInput = event.target as HTMLInputElement;

    if (!fileInput.files || fileInput.files.length === 0) {
      this.imageBase64 = '';
    } else {
      const reader: FileReader = new FileReader();
      reader.readAsDataURL(fileInput.files[0]);
      reader.addEventListener('loadend', () => {
        this.imageBase64 = reader.result as string;
      });
    }
  }

  addUser() {
    const email = this.registerForm.get('emailGroup')?.get('email');
    const name = this.registerForm.get('name');
    const password = this.registerForm.get('password');

    const newUser: User = {
      email: email?.value ? email?.value : '',
      avatar: this.imageBase64,
      name: name?.value ? name?.value : '',
      password: password?.value ? password?.value : ''
    }

    this.#authService.register(newUser).subscribe({
      next: () => { 
        this.activeModal.close();
        this.toastr.success('!Registro realizado con exito!', 'Registro de usuario');
       },
      error: () => { 
        this.toastr.error('Error en el registro', 'Registro de usuario');
       }
    })
  }

  validClasses(control: AbstractControl, validClass: string, errorClass: string) {
    return {
      [validClass]: control.touched && control.valid,
      [errorClass]: control.touched && control.invalid
    };
  }
}

export function matchEmail(control: AbstractControl): ValidationErrors | null {
  const email = control.get('email')?.value;
  const email2 = control.get('emailConfirm')?.value;
  return email === email2 ? null : { match: true };
}