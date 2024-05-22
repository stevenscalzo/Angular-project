import { Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Product } from '../../interfaces/product';
import { ProductsFiltersComponent } from '../products-filters/products-filters.component';
import { ProductsService } from '../../services/products.service';
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
export class ProductsPageComponent implements OnInit, OnChanges {
  @Input() category!: Category;

  products: Product[] = [];
  prices: number[] = [];
  webs: string[] = [];
  productsFiltered: Product[] = [];
  searchText: string = '';
  loaging: boolean = true;

  #productsService = inject(ProductsService);
  #route = inject(ActivatedRoute);
  #title = inject(Title);

  ngOnInit(): void {
    if(this.category) {
      this.#title.setTitle(this.category.name + ". Scalzo Store.")
    }
    this.loadProducts();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.category) {
      this.#title.setTitle(this.category.name + ". Scalzo Store.")
    }
    this.loadProducts();
  }

  loadProducts(): void {
    if (this.category) {
      this.getProductsByCategory(this.category._id);
    } else {
      this.searchProducts();
    }
  }

  private getProductsByCategory(categoryId: string): void {
    this.#productsService.getProductsByCategory(categoryId).subscribe(products => {
      this.updateProducts(products);
    });
  }

  private searchProducts(): void {
    this.#route.url.subscribe(urlSegments => {
      this.searchText = this.getSearchTextFromUrl(urlSegments);

      if (this.searchText) {
        this.#productsService.getProductsByText(this.searchText).subscribe(products => {
          if(products) {
            this.updateProducts(products);
          } else {
            this.products = [];
            this.loaging = false;
          }
        });
      }
    });
  }

  private getSearchTextFromUrl(urlSegments: any[]): string {
    const url = urlSegments.map(segment => segment.path).join('/');
    return url.startsWith('search/') ? url.replace('search/', '') : '';
  }

  private updateProducts(products: Product[]): void {
    this.products = products;
    this.productsFiltered = this.products;
    this.prices = this.productsFiltered.map(product => product.price);
    this.prices = this.prices.filter((price, index, self) => self.indexOf(price) === index);
    this.webs = this.productsFiltered.map(product => product.web._id);
    this.webs = this.webs.filter((web, index, self) => self.indexOf(web) === index);
    this.loaging = false;
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
