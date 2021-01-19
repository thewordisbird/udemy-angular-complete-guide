import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model'

@Injectable()
export class RecipeService{
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = []
//   private recipes: Recipe[] = [
//     new Recipe(
//       'A Test Recipe', 
//       'This is simply a test!', 
//       'https://bitofthegoodstuff.com/wp-content/uploads/2018/05/Seitan-1-1000.jpg',
//       [
//         new Ingredient('Meat', 1),
//         new Ingredient('French Fries', 20)
//       ]
//     ),
//     new Recipe(
//       'Another Test Recipe', 
//       'This is simply a test!', 
//       'https://bitofthegoodstuff.com/wp-content/uploads/2018/05/Seitan-1-1000.jpg',
//       [
//         new Ingredient('Buns', 2),
//         new Ingredient('Meat', 1)
//       ]
//     )
//   ];

  constructor(private shoppingListService: ShoppingListService){}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice(); // Passes the array by value, not by refrence
  }

  getRecipe(id:number): Recipe {
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.shoppingListService.addIngredients(ingredients)
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice())
  }

  updateRecipe(index: number, recipe: Recipe){
    this.recipes[index] = recipe
    this.recipesChanged.next(this.recipes.slice())
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }


}