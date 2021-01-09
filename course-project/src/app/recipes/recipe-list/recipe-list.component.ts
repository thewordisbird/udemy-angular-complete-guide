import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model'
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply a test!', 'https://bitofthegoodstuff.com/wp-content/uploads/2018/05/Seitan-1-1000.jpg'),
    new Recipe('Another Test Recipe', 'This is simply a test!', 'https://bitofthegoodstuff.com/wp-content/uploads/2018/05/Seitan-1-1000.jpg')
  ];

  selectedRecipe: Recipe;

  constructor() { }

  onRecipeSelected(recipe: Recipe){
    console.log('Recipe Recieved at list', recipe)
    this.recipeWasSelected.emit(recipe)
  }
  ngOnInit(): void {
  }

}
