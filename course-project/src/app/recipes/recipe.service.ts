import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model'
@Injectable()
export class RecipeService{
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe(
                'A Test Recipe', 
                'This is simply a test!', 
                'https://bitofthegoodstuff.com/wp-content/uploads/2018/05/Seitan-1-1000.jpg',
                [
                    new Ingredient('Meat', 1),
                    new Ingredient('French Fries', 20)
                ]
            ),
        new Recipe(
                'Another Test Recipe', 
                'This is simply a test!', 
                'https://bitofthegoodstuff.com/wp-content/uploads/2018/05/Seitan-1-1000.jpg',
                [
                    new Ingredient('Buns', 2),
                    new Ingredient('Meat', 1)
                ]
            )
    ];

    constructor(private shoppingListService: ShoppingListService){}

  getRecipes() {
      return this.recipes.slice(); // Passes the array by value, not by refrence
  }

  getRecipe(id:number): Recipe {
      return this.recipes[id];
  }
  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.shoppingListService.addIngredients(ingredients)
  }
}