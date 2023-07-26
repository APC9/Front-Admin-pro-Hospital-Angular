import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environments';
import { Medicos, MedicosResp } from '../interfaces';
import { map } from 'rxjs';

interface CreateMedico{
  name:string;
  hospital: string;
}

@Injectable({
  providedIn: 'root'
})
export class MedicosService {

  private baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient)

  constructor() { }

  // su utilizo el interceptor token.interceptor.ts y su configuracion en el app.modulo en los providers

  /* get headers():HttpHeaders{
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)

    return headers;
  } */


  loadMedicos( ){
    return this.http.get<MedicosResp>(`${this.baseUrl}/medicos` ) // { headers: this.headers }
  }

  searchMedicoByTerm( term: string){
    return this.http.get<Medicos>(`${this.baseUrl}/medicos/${term}` ) // { headers: this.headers }
      .pipe(
        map( resp => [ resp ] )
      )
  }

  createMedico(createMedico:CreateMedico){
    return this.http.post<Medicos>(`${this.baseUrl}/medicos`, createMedico ) // { headers: this.headers }
  }

  upgradeMedico(medico: Medicos, hospitalID = '' ){
    const { name, _id } = medico;
    return this.http.patch<Medicos>(`${this.baseUrl}/medicos/${_id}`,
      { name, hospital: hospitalID },
      //{ headers:this.headers}
    )
  }

  deleteMedico(id:string){
    return this.http.delete(`${this.baseUrl}/medicos/${id}`,
      //{ headers:this.headers}
    )
  }


}
