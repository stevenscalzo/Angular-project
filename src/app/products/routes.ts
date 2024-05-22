import { Routes } from '@angular/router';
import { productResolver } from '../resolvers/product.resolver';
import { categoryResolver } from '../resolvers/category.resolver';


export const productsRoutes: Routes = [
    {
        path: ':id',
       // title: 'Productos',
        resolve: {
            category: categoryResolver,
        },
        loadComponent: () =>
            import('./products-page/products-page.component').then(
                (m) => m.ProductsPageComponent
            ),
    },
    {
        path: 'search/:text',
        title: 'Productos',
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