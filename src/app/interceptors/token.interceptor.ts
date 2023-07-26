import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  getHeaders():HttpHeaders{
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)

    return headers;
  }

  handleErrors(err: HttpErrorResponse){
    console.log(err)
    return throwError(err)
  }



  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('clg desde el interceptor')
    const headers = this.getHeaders()

    const reqClone = req.clone({
      headers
    })

    return next.handle(reqClone).pipe(
      catchError( this.handleErrors )
    );
  }
}
