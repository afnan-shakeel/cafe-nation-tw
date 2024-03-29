import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { MenuConfigComponent } from './pages/menu-config/menu-config.component';
import { Error404Component } from './layout/error-404/error-404.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { CategoriesComponent } from './pages/categories/categories.component';

export const routes: Routes =  [
    {
        path: '', component: MainLayoutComponent, children: [
            { path: '', redirectTo: '/home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'menu', component: ProductsComponent },
            { path: 'menu-config', component: MenuConfigComponent, },
            { path: 'categories', component: CategoriesComponent, },
        ],
    },
    { path: '**', component: Error404Component, },
];
