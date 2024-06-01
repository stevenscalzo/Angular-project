import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Product } from '../../interfaces/product';
import { ProductsFiltersComponent } from '../products-filters/products-filters.component';
import { Category } from '../../interfaces/category';
import { ActivatedRoute } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'products-page',
  standalone: true,
  imports: [ProductCardComponent, ProductsFiltersComponent, MatProgressSpinnerModule],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.scss'
})
export class ProductsPageComponent implements OnChanges {
  @Input() category!: Category;
  @Input() products!: Product[];

  prices: number[] = [];
  webs: string[] = [];
  productsFiltered: Product[] = [];
  searchText: string = '';
  #title = inject(Title);
  #route = inject(ActivatedRoute);

  ngOnChanges(changes: SimpleChanges): void {
    if (this.category) {
      this.#title.setTitle(this.category.name + ". Scalzo Store.")
    } else {
      this.searchText = this.#route.snapshot.paramMap.get('text') ? this.#route.snapshot.paramMap.get('text')!: '';
    }
    this.loadProducts();
  }

  loadProducts(): void {
    this.productsFiltered = this.products;
    
    let productsPrices = this.productsFiltered.map(product => product.price);
    let productsWebs = this.productsFiltered.map(product => product.web._id);
    
    this.prices = productsPrices.filter((price, index, self) => self.indexOf(price) === index);
    this.webs = productsWebs.filter((web, index, self) => self.indexOf(web) === index);
  }

  handleFiltersApplied(event: { prices: any[], webs: any[] }) {
    this.productsFiltered = this.products;

    if (event.webs.length > 0) {
      const stringWebIds = event.webs.map(id => id.toString());
      this.productsFiltered = this.products.filter(product => stringWebIds.includes(product.web._id));
    }

    if (event.prices.length > 0) {
      const priceRanges = event.prices.map(priceRange => {
        const range = priceRange.split('-').map(Number);
        return [range[0], range[1]];
      });

      this.productsFiltered = this.productsFiltered.filter(product => {
        const price = product.price;
        return priceRanges.some(range => price >= range[0] && price <= range[1]);
      });
    }
  }
}
