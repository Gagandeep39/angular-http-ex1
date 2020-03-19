import { tap } from 'rxjs/operators';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpEventType
} from '@angular/common/http';
import { Observable } from 'rxjs';

export class LoggingInterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('Logging: Outgoing request');
    console.log(req.headers);
    console.log(req.body);

    return next.handle(req).pipe(
      tap(event => {
        if (event.type === HttpEventType.Response) {
          console.log('Logging: Incoming response');
          console.log(event.body);
        }
      })
    );
  }
}
