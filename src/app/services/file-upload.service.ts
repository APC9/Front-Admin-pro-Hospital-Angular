import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environments';
import { UserService } from './user.service';
import { TypeFile } from '../interfaces';


interface Resp {
  url: string
}

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);
  private userService = inject( UserService );
  
  public user = this.userService.user!;

  constructor() { }

  updatePhoto(file:File, type: TypeFile.user | TypeFile.hospital | TypeFile.medico, id:string ){

    const formData = new FormData();
    formData.append('img', file)

    switch (type) {
      case TypeFile.user:
        return this.http.post<Resp>(`${this.baseUrl}/cloudinary/upload/${TypeFile.user}/${ id }`, formData, 
          {headers: this.userService.headers } )
      
      case TypeFile.hospital:
        return this.http.post<Resp>(`${this.baseUrl}/cloudinary/upload/${TypeFile.hospital}/${ id }`, formData, 
          {headers: this.userService.headers } )
      
      case TypeFile.medico:
        return this.http.post<Resp>(`${this.baseUrl}/cloudinary/upload/${TypeFile.medico}/${ id }`, formData, 
          {headers: this.userService.headers } )

    
      default:
        break;
    }

    return this.http.post<Resp>(`${this.baseUrl}/cloudinary/upload/${TypeFile.user}/${ id }`, formData, 
      {headers: this.userService.headers } )
  }

}
