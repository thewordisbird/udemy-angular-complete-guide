import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { exhaustMap, map, take, tap } from 'rxjs/operators'
import { AuthService } from "../auth/auth.service";

@Injectable({providedIn: 'root'})
export class DataStorageService {
  
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ){}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(
      'https://ng-course-recipe-book-34eb3-default-rtdb.firebaseio.com/recipes.json', 
      recipes
    ).subscribe(
      resp => {
        console.log(`storeRecipes response ${resp}`);
      }
    );
  }

  fetchRecipes() {
    // the take operator will subscribe for the given number of emits then unsubscribe
    // Because we used a BehaviorSubject, this will take the last value emitted
    return this.http
      .get<Recipe[]>(
      'https://ng-course-recipe-book-34eb3-default-rtdb.firebaseio.com/recipes.json'
    )
    .pipe(
      map(recipes => {
        return recipes.map(recipe => {
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
        })
      }),
      tap(recipes => {
        this.recipeService.setRecipes(recipes);
        })
    );
  }
}