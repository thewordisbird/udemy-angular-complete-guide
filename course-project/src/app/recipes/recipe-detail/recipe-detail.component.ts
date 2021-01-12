import { Component, Input, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipe;
  constructor(private recipeSercice: RecipeService) { }

  ngOnInit(): void {
  }

  toShoppingList(){
    this.recipeSercice.addIngredientsToShoppingList(this.recipe.ingredients);
  }
}
