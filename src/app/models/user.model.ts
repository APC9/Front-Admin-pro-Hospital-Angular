import { environment } from '../../environments/environments';

export class User {

  private baseUrl: string = environment.baseUrl;

  constructor(
    public _id: string,
    public name: string,
    public email: string,
    public password?: string,
    public img?: string,
    public google?: boolean,
    public isActive?: boolean,
    public roles?: string[],
  ){}

  get imagenUser(){
    if( !this.img )
      return 'https://res.cloudinary.com/dybfsyxq9/image/upload/v1686847866/no-image_zio7qg.jpg'

    return this.img
  }

  set changeImage( img: string){
    this.img = img
  }
  
}

