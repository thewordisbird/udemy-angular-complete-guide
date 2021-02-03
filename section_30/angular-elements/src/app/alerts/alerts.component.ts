import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styles: [`
  div {
    border: 1px solid black;
    background: salmon;
    padding: 10px;
    font-family: sans-serif;
  }
  `]
})
export class AlertsComponent implements OnInit {
@Input() message: string;

  constructor() { }

  ngOnInit(): void {
  }

}
