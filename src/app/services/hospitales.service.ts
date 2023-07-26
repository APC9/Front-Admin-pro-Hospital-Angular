import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Hospital, Hospitals } from '../interfaces';


@Injectable({
  providedIn: 'root'
})
export class HospitalesService {

  private baseUrl: string = environment.baseUrl;

  constructor(
    private http: HttpClient,
  ) { }

  get headers():HttpHeaders{
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)

    return headers;
  }

  loadHospital( from:string= '0', limit:string = '5'){
    return this.http.get<Hospitals>(`${this.baseUrl}/hospital?limit=${limit}&offset=${from}`, { headers: this.headers } )
  }
 
  createHospital( name:string ){
    return this.http.post<Hospital>(`${this.baseUrl}/hospital`, { name }, { headers: this.headers } )
  }

  upgradeHospital(hospital:Hospital){
    return this.http.patch<Hospital>(`${this.baseUrl}/hospital/${hospital._id}`, 
      { name: hospital.name}, 
      { headers:this.headers}
    )
  }

  deleteHospital(hospital:Hospital){
    return this.http.delete(`${this.baseUrl}/hospital/${hospital._id}`, 
      { headers:this.headers}
    )
  }

  searchHospital(term:string){
    return this.http.get<Hospital>(`${this.baseUrl}/hospital/${term}`, { headers: this.headers } )
  }

}
