import { Component, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertsComponent } from './alerts/alerts.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  content = null;

  constructor(injector: Injector, domSanitizer: DomSanitizer){
    const AlertElement = createCustomElement(AlertsComponent, {injector: injector})
    customElements.define('my-alert', AlertElement);
    setTimeout(()=> {
      this.content = domSanitizer.bypassSecurityTrustHtml("<my-alert message='Rendered Dynamically'></my-alert>")
    },1000)
  }

}
