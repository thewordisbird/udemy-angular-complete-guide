import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers', // <-- Select an angular component
  // selector: '[app-servers]', // <-- Select an html attribute
  // selector: '.app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  allowNewServer: boolean = false;
  serverCreationStatus: string = 'No server was created!'
  serverName =  'Test Server';
  serverCreated: boolean = false
  servers = ['Testserver', 'Testserver 2']
  constructor() { 
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000);
  }
  ngOnInit(): void {
  }

  onCreateServer() {
    this.serverCreated = true
    this.servers.push(this.serverName)
    this.serverCreationStatus = 'Server was created! Name is' + this.serverName;
  }

  onUpdateServerName(event: any) {
    // Explicitly cast the type of the event target as shown.
    this.serverName = (<HTMLInputElement>event.target).value
  }
}
