import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imgPipe'
})
export class ImgPipe implements PipeTransform {

  public noImage: string = 'https://res.cloudinary.com/dybfsyxq9/image/upload/v1686847866/no-image_zio7qg.jpg';

  transform(url: string | undefined ): string {
    
    if(!url){
      return this.noImage;
    }

    return url
  }

}
