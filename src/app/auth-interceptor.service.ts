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

    console.log('Intercepted');
    return next.handle(req);
  }
}
