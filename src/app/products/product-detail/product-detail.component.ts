import { Component, Input, OnInit, inject } from '@angular/core';
import { Product } from '../../interfaces/product';
import { CartService } from '../../services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'product-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  @Input() product!: Product;

  #cartService = inject(CartService);
  #title = inject(Title);

  quantity: number = 1;
  toastr = inject(ToastrService);
  rating:number = 3;

  ngOnInit(): void {
    if(this.product) {
      this.#title.setTitle(this.product.title + ". Scalzo Store.")
    }
  }
  
  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  increaseQuantity() {
    if (this.quantity < this.product.qty) {
      this.quantity++;
    }
  }

  addToCart() {
    this.#cartService.addToCart(this.product, this.quantity).subscribe(() => {
      let message = "Ha añadido " + this.quantity + " producto(s) al carrito "
      this.quantity = 1;
      this.toastr.success(message, 'Añadir al carrito');
    });
  }
}
