import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {
  }
  displaySecret: boolean = false;
  clickLog = [];
  backgroundStatus = 'white'

  onDisplayClick() {
    this.displaySecret = !this.displaySecret;
    this.clickLog.push([Date.now(), this.displaySecret ? 'Displayed Secret Message' : 'Hid Secret Message'])
  }

  getColor(idx) {
    return idx > 3 ? 'lightblue' : '';
  }
}
