import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
  selector: '[appPlaceholder]',
})
export class PlaceholderDirective {
  // The ViewContainerRef gives access to a pointer at the place where
  // this directive is used.
  //  - coordinate, methods, etc.
  constructor(public viewContainerRef: ViewContainerRef) {}
}