import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

// Routes constant where routes are defined
const appRoutes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {
    path: 'recipes', 
    loadChildren: () => import('./recipes/recipes.module').then(m=>m.RecipesModule)
  },
  {
    path: 'shopping-list', 
    loadChildren: () => import('./shopping-list/shopping-list.module').then(m=>m.ShoppingListModule)
  },
  {
    path: 'auth', 
    loadChildren: () => import('./auth/auth.module').then(m=>m.AuthModule)
  }
];

// Configure NgModule imports and exports
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}