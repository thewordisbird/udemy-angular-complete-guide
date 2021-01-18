import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // Get access to form using @ViewChild(formref)
  @ViewChild('f', {static: false}) slForm: NgForm;
  subscribeEdit: Subscription;
  subscribeDelete: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
    // Listen to any subjects/services

    // Listen for edits
    this.subscribeEdit = this.slService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.slService.getIngredient(index);
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          })
        }
      )
  }

  ngOnDestroy(): void {
    // Cleanup any subject subscriptions
    this.subscribeEdit.unsubscribe();
  }

  onSubmit(form: NgForm){
    const value = form.value
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.slService.addIngredient(newIngredient)
    }
    // Reset the form after adding or updating
    this.editMode = false;
    form.reset();
  }

  onDelete(){
    // Inform the service to remove an item from the array
    this.slService.deleteIngredient(this.editedItemIndex)
    this.onClear()
  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }
}
