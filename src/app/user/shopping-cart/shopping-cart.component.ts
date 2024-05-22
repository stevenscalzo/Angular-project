import { Component, OnInit, inject } from '@angular/core';
import { Order } from '../../interfaces/order';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'shopping-cart',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent implements OnInit {
  #router = inject(Router);
  #cartService = inject(CartService);
  #userService = inject(UserService);
  icons = { faTrash };
  cart: Order | undefined;
  user: User | undefined;
  toastr = inject(ToastrService);

  ngOnInit(): void {
    this.#cartService.getCart().subscribe((cart) => {
      this.cart = cart;
    });

    this.#userService.getUser().subscribe((user) => {
      this.user = user;
    });
  }

  decreaseQuantity(productId: string | undefined) {
    const productIndex = this.cart!.products.findIndex(product => product._id === productId);

    if (productIndex !== -1 && this.cart!.products[productIndex].qty > 1) {
      this.cart!.products[productIndex].qty--;
      this.cart!.total -= this.cart!.products[productIndex].price;
    }
  }

  increaseQuantity(productId: string | undefined) {
    const productIndex = this.cart!.products.findIndex(product => product._id === productId);

    if (productIndex !== -1 && this.cart!.products[productIndex].qty < this.cart!.products[productIndex].productId.qty) {
      this.cart!.products[productIndex].qty++;
      this.cart!.total += this.cart!.products[productIndex].price;
    }
  }

  removePoduct(productId: string | undefined) {
    if (!productId) {
      return;
    }

    const productIndex = this.cart!.products.findIndex(product => product._id === productId);
    if (productIndex !== -1) {
      this.cart!.total -= this.cart!.products[productIndex].price * this.cart!.products[productIndex].qty;
      this.cart!.products.splice(productIndex, 1);
    }
  }

  updateOrder() {
    this.#cartService.saveCart(this.cart!).subscribe({
      next: () => {
        this.toastr.success('Carrito actualizado correctamente', 'Actualizar carrito');
      },
      error: () => {
        this.toastr.error('Error al actualizar el carrito', 'Actualizar carrito');
      }
    });
  }

  getTaxedTotal(price: number, sum: number): number {
    console.log(parseFloat(((price * 0.21) + sum).toFixed(2)))
    return parseFloat(((price * 0.21) + sum).toFixed(2));
  }

  makeOrder() {
    if(!this.user?.address) {
      this.toastr.warning('Para realizar el pedido debe completar los datos de dirección', 'Cliente incompleto');
      this.#router.navigate(['/user/profile']);
      return;
    }

    this.#cartService.markCartAsPaid().subscribe({
      next: () => {
        this.toastr.success('Pedido realizado correctamente', 'Realizar orden');
        this.#router.navigate(['/user/profile']);
      },
      error: () => {
        this.toastr.error('Error al realizar el pedido', 'Realizar orden');
      }
    });
  }

  goBack() {
    this.#router.navigate(['/']);
  }
}
