import { Routes } from '@angular/router';

export const cmsRoutes: Routes = [
    {
        path: 'info',
        title: '¿Quienes somos?',
        loadComponent: () =>
            import('./info/info.component').then(
                (m) => m.InfoComponent
            ),
    },
    {
        path: 'webs',
        title: 'Proveedores',
        loadComponent: () =>
            import('./collaborators/collaborators.component').then(
                (m) => m.CollaboratorsComponent
            ),
    }
];