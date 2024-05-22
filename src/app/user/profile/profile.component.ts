import { Component, Input, OnInit, ViewChild, inject } from '@angular/core';
import { NonNullableFormBuilder, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Address, User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import { faLock, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PasswordFormComponent } from './password-form/password-form.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { OrdersService } from '../../services/orders.service';
import { Order } from '../../interfaces/order';
import { ToastrService } from 'ngx-toastr';
import { ShoppingHistoryComponent } from '../shopping-history/shopping-history.component';

@Component({
  selector: 'profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FontAwesomeModule, MatExpansionModule, ShoppingHistoryComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  @Input() user!: User;
  @ViewChild('fileInput') fileInput: any;

  #userService = inject(UserService);
  #ordersService = inject(OrdersService);
  #fb = inject(NonNullableFormBuilder);
  #modalService = inject(NgbModal);
  icons = { faImage, faFloppyDisk, faLock };
  toastr = inject(ToastrService);

  orders: Order[] = [];

  isDataChanged = false;

  profileForm = this.#fb.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', [Validators.required]],
    phone: ['', [Validators.required]]
  });

  addressForm = this.#fb.group({
    country: ['', [Validators.required]],
    city: ['', [Validators.required]],
    state: ['', [Validators.required]],
    address: ['', [Validators.required]],
    postalCode: ['', [Validators.required]]
  });

  ngOnInit(): void {
    if (this.user) {
      this.fillForms();
      this.watchFormChanges();

      this.#ordersService.getOrders().subscribe((orders) =>{
        this.orders = orders;
      })
    }
  }

  fillForms() {
    this.profileForm.get('email')?.setValue(this.user.email);
    this.profileForm.get('name')?.setValue(this.user.name);

    this.profileForm.get('phone')?.setValue(this.user.phone ? this.user.phone : '');

    this.addressForm.get('country')?.setValue(this.user.address ? this.user.address.country : '');
    this.addressForm.get('city')?.setValue(this.user.address ? this.user.address.city : '');
    this.addressForm.get('state')?.setValue(this.user.address ? this.user.address.state : '');
    this.addressForm.get('address')?.setValue(this.user.address ? this.user.address.address : '');
    this.addressForm.get('postalCode')?.setValue(this.user.address ? this.user.address.postalCode : '');

  }

  watchFormChanges(): void {
    this.profileForm.valueChanges.subscribe(() => {
      this.isDataChanged = true;
    });

    this.addressForm.valueChanges.subscribe(() => {
      this.isDataChanged = true;
    });
  }

  openFileInput() {
    this.fileInput.nativeElement.click();
  }

  updateAvatar(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.addEventListener("load", async () => {
      const image = reader.result as string;

      this.#userService.saveAvatar(image).subscribe(
      {
        next: () => { 
          this.user.avatar = image;
          this.toastr.success('Se ha actualizado la imagen de perfil', 'Actualizar avatar');
        },
        error: () => { 
          this.toastr.error('Error actualizando la imagen de perfil', 'Actualizar avatar');
        }
      });
    });
  }

  updateProfile(): void {
    const updatedUser: User = this.user;

    updatedUser.email = this.profileForm.get('email')!.value;
    updatedUser.name = this.profileForm.get('name')!.value;
    updatedUser.phone = this.profileForm.get('phone')!.value;

    const address: Address = {
      country: this.addressForm.get('country')!.value,
      city: this.addressForm.get('city')!.value,
      state: this.addressForm.get('state')!.value,
      address: this.addressForm.get('address')!.value,
      postalCode: this.addressForm.get('postalCode')!.value
    }

    updatedUser.address = address;

    this.#userService.saveProfile(updatedUser).subscribe(
    {
      next: () => { 
        this.user = updatedUser;
        this.toastr.success('Se ha actualizado los datos del perfil', 'Actualizar perfil');
      },
      error: () => { 
        this.toastr.error('Error actualizando los datos del perfil', 'Actualizar perfil');
      }
    }
  );
  }

  cancel(): void {
    this.fillForms();
  }

  validClasses(formControl: FormControl, validClass: string, errorClass: string) {
    return {
      [validClass]: formControl.touched && formControl.valid,
      [errorClass]: formControl.touched && formControl.invalid,
    };
  }

  openPasswordForm() {
    this.#modalService.open(PasswordFormComponent);
  };
}
