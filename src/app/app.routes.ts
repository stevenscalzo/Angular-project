import { Routes } from '@angular/router';
import { authResolver } from './resolvers/auth.resolver';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {
        path: 'products',
        loadChildren: () => import('./products/routes').then(m =>
            m.productsRoutes),
            resolve: { isLogged: authResolver } 
    },
    {
        path: 'user',
        loadChildren: () => import('./user/routes').then(m =>
            m.userRoutes),
            resolve: { isLogged: authResolver } 
    },
    {
        path: 'cms',
        loadChildren: () => import('./cms/routes').then(m =>
            m.cmsRoutes) 
    },
    {
        title: "Scalzo Store",
        path: '', component: HomeComponent,
        resolve: { isLogged: authResolver } 
    },
    {
        path: '**', redirectTo: '', pathMatch: 'full'
    }
];

