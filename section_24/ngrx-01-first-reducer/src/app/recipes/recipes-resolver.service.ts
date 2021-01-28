import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { Recipe } from './recipe.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as RecipesActions from './store/recipe.actions';
import { Actions, ofType } from '@ngrx/effects';
import { map, switchMap, take } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // return this.dataStorageService.fetchRecipes();
    // Need to wait for observable to complete 
    return this.store.select('recipes').pipe(
      take(1),
      map(recipesState => {
        return recipesState.recipes
      }),
      switchMap(recipes => {
        if (recipes.length === 0) {
          this.store.dispatch(new RecipesActions.FetchRecipes());
          // Use the SET_RECIPES action as a trigger to know when the recipes are there to 
          // move forward with resolving the route.
          return this.actions$.pipe(
            ofType(RecipesActions.SET_RECIPES), 
            take(1)
          );
        } else {
          return of(recipes)
        }
      })
    )
  }
}
