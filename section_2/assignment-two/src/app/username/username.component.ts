import { Component, OnInit} from '@angular/core';

@Component({
  selector: "app-username",
  templateUrl: "./username.component.html",
  styleUrls: []
})
export class UsernameComponent{
  constructor() {}

  ngOnInit(): void {}

  username: string = ""

  onResetClick() {
    this.username = ""
  }

}