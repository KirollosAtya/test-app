import { Routes } from '@angular/router';

import { CategoryList } from './components/categories/category-list/category-list';
import { CategoryForm } from './components/categories/category-form/category-form';

export const routes: Routes = [
  { path: '', redirectTo: 'categories', pathMatch: 'full' },
  { path: 'categories', component: CategoryList },
  { path: 'categories/new', component: CategoryForm },
  { path: 'categories/edit/:id', component: CategoryForm }
];