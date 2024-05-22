import { Component, Input } from '@angular/core';
import { Order } from '../../interfaces/order';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'shopping-history',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatExpansionModule],
  templateUrl: './shopping-history.component.html',
  styleUrl: './shopping-history.component.scss'
})
export class ShoppingHistoryComponent {
  @Input({ required: true }) orders!: Order[];

}
