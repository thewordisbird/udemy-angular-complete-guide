import { HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { tap} from 'rxjs/operators';
export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Code will run right before request leaves application
    const modifiedRequest = req.clone({headers: req.headers.append('Auth', 'intercepter injected auth header')})
    // next.handle(req) required to pass the request on in the process
    // You can use the .pipe to modify the response
    return next.handle(modifiedRequest);
  }
}