import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ProductFilterComponent } from './product-filter/product-filter.component';

import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'products-filters',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [ProductFilterComponent, MatAccordion, MatButtonModule],
  templateUrl: './products-filters.component.html',
  styleUrl: './products-filters.component.scss'
})
export class ProductsFiltersComponent {
  @ViewChild(MatAccordion) accordion: MatAccordion = new MatAccordion;
  @Input({required: true}) prices!: number[];
  @Input({required: true}) webs!: string[];
  @Output() filtersApplied = new EventEmitter<{ prices: any[], webs: any[] }>();

  priceType = "price";
  webType = "web";
  selectedPriceValues: any[] = [];
  selectedWebValues: any[] = [];

  applyFilters() {
    this.filtersApplied.emit({
      prices: this.selectedPriceValues,
      webs: this.selectedWebValues
    });
  }

  onPriceFilterChanged(selectedValues: any[]) {
    this.selectedPriceValues = selectedValues;
  }

  onWebFilterChanged(selectedValues: any[]) {
    this.selectedWebValues = selectedValues;
  }
}
