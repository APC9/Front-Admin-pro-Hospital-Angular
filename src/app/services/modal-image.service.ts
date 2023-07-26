import { EventEmitter, Injectable } from '@angular/core';
import { Hospital, Medicos, TypeFile, User } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ModalImageService {

  private _hidenModal: boolean = true;

  public img?:string;
  public _id!: string;
  public type!: TypeFile.user | TypeFile.hospital | TypeFile.medico;

  public newImage: EventEmitter<string> = new EventEmitter<string>();

  get hidenModal(){
    return this._hidenModal;
  }

  openModal( tipos: User | Hospital | Medicos ){ //*todo: cambiar tipo: 'user'| 'hospital' | 'medicos'

    tipos.hasOwnProperty('email') 
      ? this.type = TypeFile.user 
      : this.type = TypeFile.hospital; //Todo: Agregar medico

    if( tipos.hasOwnProperty('hospital') ){
      this.type = TypeFile.medico
    }

    this._hidenModal = false;
    this._id = tipos._id;
    this.img = tipos.img
                  ? tipos.img
                  : 'https://res.cloudinary.com/dybfsyxq9/image/upload/v1686847866/no-image_zio7qg.jpg';
  }

  closeModal(){
    this._hidenModal = true;
  }

  constructor() { }
}
