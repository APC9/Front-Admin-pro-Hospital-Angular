import { Component, inject } from '@angular/core';
import Swal from 'sweetalert2';

import { ModalImageService } from '../../services/modal-image.service';
import { FileUploadService } from '../../services/file-upload.service';
import { User } from '../../models/user.model';
import { TypeFile } from '../../interfaces/type-file.enum';

@Component({
  selector: 'app-ModalImagesComponent',
  templateUrl: './modal-images.component.html',
  styles: [
  ]
})
export class ModalImagesComponent {

  public modalImageService = inject( ModalImageService );
  public fileUploadService = inject( FileUploadService );
  public uploadImage!: File;
  public previewImage!: string | null;

  closeModal(){
    this.previewImage = null;
    this.modalImageService.closeModal();
  }

  changeImage(file:File){
    this.uploadImage = file;

    if(!file) return;

    const reader = new FileReader();
    const url64 = reader.readAsDataURL( file );

    reader.onloadend = () => {
      this.previewImage = reader.result as string;
    }
  }

  sendImage(){

    this.fileUploadService.updatePhoto( this.uploadImage, this.modalImageService.type, this.modalImageService._id)
    .subscribe({
      next: (resp) => {
          this.closeModal(),
          this.modalImageService.newImage.emit(resp.url),
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `${ this.modalImageService.type } actualizado correctamente`,
            showConfirmButton: false,
            timer: 2500
          })
        },
        error: (err) => console.log(err)
      })
  }



}
