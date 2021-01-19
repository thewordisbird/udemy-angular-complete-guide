import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from "rxjs";
@Injectable({providedIn: 'root'})
export class PostService {
  error = new Subject<string>();

  constructor(private http: HttpClient){}

  createAndStorePost(title: string, content: string){
  // The Js object is converted to json by angular
  // The request objects are of type observable and need to be subscribed to in order to be sent/recieved
  const postData: Post = {title: title, content: content}
  this.http.post<{name: string}>(
  'https://np-complete-guide-8c844-default-rtdb.firebaseio.com/posts.json', 
  postData,
  {
    observe: 'response'
  }
  )
  .subscribe(
    responseData => {
      console.log(responseData)
    },
    error => {
      this.error.next(error.message);
    }
    );
  }

  fetchPosts() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty')
    searchParams = searchParams.append('custom', 'key')
    // Returns the observable. It must be subscribed to when called to be used.
    return this.http.get<{ [key: string]: Post}>(
      'https://np-complete-guide-8c844-default-rtdb.firebaseio.com/posts.json',
      {
        headers: new HttpHeaders({'Custom-Header': 'Hello'}),
        params: searchParams,
      }
    )
    // Use observable operator , pipe() to transform object into array
      .pipe(
        map(
          (responseData) => {
            const postsArray: Post[] = []
            for (const key in responseData) {
              if (responseData.hasOwnProperty(key)){
                postsArray.push({...responseData[key], id: key})
              }
            }
            return postsArray;
          }
        ),
        catchError(errorRes => {
          // Send to anylitics or any other error handling tasks
          // but you need to be able to pass the error on to subscribe
          return throwError(errorRes) // This will pass the error as an observable to subscribe
        })
      )
    }

  clearPosts() {
    return this.http.delete(
      'https://np-complete-guide-8c844-default-rtdb.firebaseio.com/posts.json',
      {
        observe: 'events',
        responseType: 'text'
      }
    ).pipe(tap(event => {
      console.log(event);
      if (event.type === HttpEventType.Sent) {
        // ... can inform the user the request was sent
      }
      if (event.type === HttpEventType.Response) {
        console.log(event.body)
      }
    }))
  }
}