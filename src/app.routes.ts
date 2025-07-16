import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Notfound } from './app/pages/notfound/notfound';
import { PersonalComponent } from './app/pages/personal/personal.component';
import { CategoriaComponent } from './app/pages/categoria/categoria.component';
import { ItemComponent } from './app/pages/item/item.component';
import { EntregaComponent } from './app/pages/entrega/entrega.component';

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') },
            { path: 'personal', component: PersonalComponent },
            { path: 'categoria', component: CategoriaComponent },
            { path: 'item', component: ItemComponent },
            { path: 'entrega', component: EntregaComponent },
        ]
    },
    { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' }
];
