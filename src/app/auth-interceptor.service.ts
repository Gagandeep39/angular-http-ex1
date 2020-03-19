import { tap, map } from 'rxjs/operators';
import {
  HttpInterceptor,
  HttpEvent,
  HttpEventType
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  intercept(
    req: import('@angular/common/http').HttpRequest<any>,
    next: import('@angular/common/http').HttpHandler
  ) {
    // We can enable/disable is for specific URL as follow
    // if (req.url === 'www.google.com')

    // Here we are creatign a modified request by appending additional headers
    const modifiedReq = req.clone({
      headers: req.headers.append('appendedHeader', '<3')
    });

    console.log('Intercepted');
    // Here we send the modified request
    // Responsew can lso be manipulated
    return next.handle(modifiedReq).pipe(
      tap(event => {
        if (event.type === HttpEventType.Response) {
          console.log('Inteerceptor Response arrived: ');
          console.log(event.body);
        }
      })
      // here we returned null to requester which causes app to show empty list
      //   map(response => {
      //     console.log('Map data: ');
      //     console.log(response);
      //     return null;
      //   })
    );
  }
}
