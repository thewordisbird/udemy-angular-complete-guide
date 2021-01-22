import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: 'alert.component.html',
  styleUrls: ['alert.component.css']
})
export class AlertComponent{
  // @Input allows for data to passed in thru property binding
  @Input() message: string;
  @Output() close = new EventEmitter<void>();

  onClose(){
    this.close.emit();
  }
}