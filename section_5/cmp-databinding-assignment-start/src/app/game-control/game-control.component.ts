import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {
  @Output() gameStarted = new EventEmitter<number>();
 
  gameId: number;
  constructor() { }

  ngOnInit(): void {
  }

  counter(){
    let num = 0;
    return () => {
      this.gameStarted.emit(num++)
    }
  }
  onStartGame(){
    const gameCounter = this.counter()
    this.gameId = window.setInterval(gameCounter, 1000)
    
  }

  onEndGame(){
    clearInterval(this.gameId)
  }
}
