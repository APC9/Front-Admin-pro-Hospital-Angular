import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environments';
import { User } from '../models/user.model';
import { User as UserInterface } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private baseUrl: string = environment.baseUrl;
  private http = inject( HttpClient );

  constructor() { }

  get headers():HttpHeaders{
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)

    return headers;
  }

  searchUser(term:string){
    return this.http.get<User>( `${this.baseUrl}/auth/search-by/${term}`, { headers: this.headers } )
  }

  changeUserRoles( user:UserInterface ):Observable<User>{
    return this.http.patch<User>(`${ this.baseUrl }/auth/update/${ user!._id }`, 
            { roles: [ user.roles ] }, 
            { headers: this.headers })
  }

  deleteUser(term:string){
    return this.http.delete( `${this.baseUrl}/auth/${term}`, { headers: this.headers } )
  }

}
