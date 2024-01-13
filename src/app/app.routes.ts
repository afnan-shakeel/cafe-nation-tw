import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ProductsComponent } from './pages/products/products.component';
import { MenuConfigComponent } from './pages/menu-config/menu-config.component';
import { Error404Component } from './layout/error-404/error-404.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

export const routes: Routes =  [
    {
        path: '', component: MainLayoutComponent, children: [
            { path: '', redirectTo: '/home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'products', component: ProductsComponent },
            { path: 'menu-config', component: MenuConfigComponent, },
            { path: 'about', component: AboutComponent, },
        ],
    },
    { path: '**', component: Error404Component, },
];
