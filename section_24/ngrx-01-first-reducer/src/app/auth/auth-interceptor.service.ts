import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpParams
} from '@angular/common/http';
import { take, exhaustMap, map } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  
  constructor(
    private store: Store<fromApp.AppState>
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.store.select('auth').pipe(
      take(1),
      map(authState => {
        console.log('AUTH STATE:', authState.user)
        return authState.user
      }),
      exhaustMap(user => {
        if (!user) {
          return next.handle(req);
        }
        const token = user.token
        console.log('User Token:', user.token)
        console.log('OG Request:', req)
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', token)
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
