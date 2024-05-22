import { Component, OnInit, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../interfaces/category';
import { AuthComponent } from '../auth/auth/auth.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { faUser as faUserRegular } from '@fortawesome/free-regular-svg-icons';
import { faBars, faMagnifyingGlass, faCartShopping, faUser, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'menu',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FontAwesomeModule, MatButtonModule, MatMenuModule, AuthComponent, MatSidenavModule, MatListModule, MatToolbarModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {
  #categoriesService = inject(CategoriesService);
  #modalService = inject(NgbModal);
  #authService = inject(AuthService);
  #router = inject(Router);
  toastr = inject(ToastrService);

  logged = computed(() => this.#authService.logged());

  categories: Category[] = [];
  icons = { faBars, faMagnifyingGlass, faCartShopping, faUser, faUserRegular, faArrowRightFromBracket };

  logo = "assets/scalzo-2.png";

  ngOnInit(): void {
    this.#categoriesService
      .getCategories()
      .subscribe((categories) => {
        this.categories = categories;
      });
  }

  openLoginForm(): void {
    this.#modalService.open(AuthComponent);
  }

  search(text: string): void {
    if (text.trim() !== '') {
      this.#router.navigate(['/products/search', text]);
    }
  }

  logout() {
    this.#authService.logout();
    this.toastr.success('Ha finalizado sesión, !Adiós!', 'Cierre se sesión');
    this.#router.navigate(['/']);
  }
}
