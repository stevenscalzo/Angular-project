import { Routes } from '@angular/router';
import { productResolver } from '../resolvers/product.resolver';
import { categoryResolver } from '../resolvers/category.resolver';
import { productsResolver } from '../resolvers/products.resolver';


export const productsRoutes: Routes = [
    {
        path: ':id',
        resolve: {
            category: categoryResolver,
            products: productsResolver,
        },
        loadComponent: () =>
            import('./products-page/products-page.component').then(
                (m) => m.ProductsPageComponent
            ),
    },
    {
        path: 'search/:text',
        title: 'Productos',
        resolve: {
            products: productsResolver,
        },
        loadComponent: () =>
            import('./products-page/products-page.component').then(
                (m) => m.ProductsPageComponent
            ),
    },
    {
        path: 'detail/:id',
        title: 'Productos',
        resolve: {
            product: productResolver,
        },
        loadComponent: () =>
            import('./product-detail/product-detail.component').then(
                (m) => m.ProductDetailComponent
            ),
    }
];