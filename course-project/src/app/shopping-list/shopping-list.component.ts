import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private igChangeSub: Subscription;

  constructor(
    private shoppingListSercice: ShoppingListService,
    private loggingService: LoggingService
  ) {}

  ngOnInit(): void {
    this.ingredients = this.shoppingListSercice.getIngredients();
    // Subscribe to event listener
    this.igChangeSub = this.shoppingListSercice.ingredientsChanged
      .subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients
        }
      );
  }

  ngOnDestroy(){
    this.igChangeSub.unsubscribe();
  }

  onEditItem(index: number){
    // Want to get this information to the shopping edit component. 
    // - Setup a subject in the shopping list service that the edit component can subscribe to.
    this.shoppingListSercice.startedEditing.next(index)

  }
  
}
