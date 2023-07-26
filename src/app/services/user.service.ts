import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable, catchError, map, of, tap } from 'rxjs';
import { environment } from '../../environments/environments';
import { Menu, UserLogin, Users } from '../interfaces';
import { User } from '../models/user.model';


declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string = environment.baseUrl;
  public user?: User;
  public auth2: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) { }

  get userRole(){
    return this.user!.roles!
  }

  get headers():HttpHeaders{
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)

    return headers;
  }

  createUser( form: FormGroup ){
    const { terms, password2, ...rest } = form.value;
    return this.http.post<UserLogin>(`${this.baseUrl}/auth/create`, rest)
                .pipe(
                  tap( user => {
                    localStorage.setItem('token', user.token )
                  })
                )
  }

  updateProfile( data:{name:string, email: string } ):Observable<UserLogin>{

    return this.http.patch<UserLogin>(`${ this.baseUrl }/auth/update/${this.user!._id }`, data, { headers: this.headers })
  }

  loginUser( form: FormGroup ){
    const { remenber, ...rest } = form.value;
    return this.http.post<UserLogin>(`${this.baseUrl}/auth/login`, rest)
                .pipe(
                  tap( (user) => {
                    localStorage.setItem('token', user.token)
                  })
                )
  }

  loginGoogle(response:any){
    const { credential } = response;
    return this.http.post<UserLogin>(`${this.baseUrl}/auth/google`, { token:credential } )
                .pipe(
                  tap( user => {
                    localStorage.setItem('token', user.token)
                  })
                )
  }

  logout() {

    const regex = /gmail/;
    localStorage.removeItem('token');
    localStorage.removeItem('menu');

    this.router.navigateByUrl('/auth/login');

    if ( regex.test(this.user!.email ) ){
      google.accounts.id.revoke( this.user!.email , ()=>{
        this.ngZone.run(() => {

        })
      })

    }
  }

  validarToken(): Observable<boolean> {

    return this.http.get<UserLogin>(`${ this.baseUrl }/auth/check-token`, { headers: this.headers })
    .pipe(
      tap( (resp: any) => {
        const { email, google, img, isActive, name, roles, _id, ...rest } = resp.user;
        this.user = new User(_id, name, email, '', img, google, isActive, roles);
        localStorage.setItem('token', resp.token );
      }),
      map( resp => true),
      catchError( error => of(false) )
    );

  }

  loadUsers( from:string= '0', limit:string = '5'){

    return this.http.get<Users>(`${this.baseUrl}/auth?limit=${limit}&offset=${from}`, { headers: this.headers } )

  }


}
