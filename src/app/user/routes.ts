import { Routes } from '@angular/router';
import { userResolver } from '../resolvers/user.resolver';
import { loginActivateGuard } from '../guards/login-activate.guard';

export const userRoutes: Routes = [
    {
        path: 'profile',
        title: 'Perfil',
        resolve: {
            user: userResolver,
        },
        canActivate: [loginActivateGuard],
        loadComponent: () =>
            import('./profile/profile.component').then(
                (m) => m.ProfileComponent
            ),
    },
    {
        path: 'cart',
        title: 'Carrito de compra',
        canActivate: [loginActivateGuard],
        resolve: {
            user: userResolver
        },
        loadComponent: () =>
            import('./shopping-cart/shopping-cart.component').then(
                (m) => m.ShoppingCartComponent
            ),
    },
    {
        path: 'history',
        title: 'Historial de compra',
        canActivate: [loginActivateGuard],
        resolve: {
            user: userResolver,
        },
        loadComponent: () =>
            import('./shopping-history/shopping-history.component').then(
                (m) => m.ShoppingHistoryComponent
            ),
    }
];