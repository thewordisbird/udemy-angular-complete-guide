import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers', // <-- Select an angular component
  // selector: '[app-servers]', // <-- Select an html attribute
  // selector: '.app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
