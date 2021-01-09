import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {
  // using set creates a method, but this is still a property
  @Input() set appUnless(condition: boolean) {
    if(!condition){
      // Display Something
      this.vcRef.createEmbeddedView(this.templateRef);
    } else {
      // Display Nothing
      this.vcRef.clear();
    }
  }
  constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef) { }

}
