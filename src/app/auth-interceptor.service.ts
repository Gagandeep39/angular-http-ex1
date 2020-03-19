import { HttpInterceptor, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
    // Here we handle the modified request
    return next.handle(modifiedReq);
  }
}
