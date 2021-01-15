import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObsSubscription: Subscription

  constructor() { }

  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe(count => {
    //   console.log(count);
    // })
    const customIntervalObservable = Observable.create((observer) => {
      let count = 0
      setInterval(() => {
        observer.next(count);
        if (count === 2) {
          // When an observable completes, it is done and no longer emits
          observer.complete()
        }
        if (count > 3){
          // When an error is thrown, the observable dies and doesn't need to be unsubscribed
          observer.error(new Error( 'count is greater than 3'))
        }
        count++
      }, 1000)
    })

    

    this.firstObsSubscription = customIntervalObservable.pipe(filter(data=> {
      return data > 0;
    }),map(data => {
      return `Round: ${data + 1}`
    })).subscribe(data => {
      console.log(data)
    }, error => {
      console.log(error);
      alert(error.message)
    }, () => {
      console.log('completed')
    })
  }

  ngOnDestroy() {
    this.firstObsSubscription.unsubscribe()
  }
}
