import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from "@angular/core";

@Directive({
  selector:'[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;

  @HostListener('click') toggleOpen () {
    this.isOpen = !this.isOpen;
  }
}
// export class DropdownDirective {
//   // Listen for click and add toggle dropdown by adding or removing 'open' class to button
//   @HostBinding('class') toggleOpen: string;

//   constructor(private elRef: ElementRef, private renderer: Renderer2){}

//   ngOnInit() {
//     this.toggleOpen = '';
//   }

//   @HostListener('click') click(eventData: Event) {
//     this.toggleOpen = this.toggleOpen === 'open' ? '' : 'open'
//   }
// }
