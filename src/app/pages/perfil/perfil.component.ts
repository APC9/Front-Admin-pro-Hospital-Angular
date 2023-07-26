import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

import { ValidatorsService } from '../../services/validators.service';
import { UserService } from '../../services/user.service';
import { FileUploadService } from '../../services/file-upload.service';
import { User } from '../../models/user.model';
import { TypeFile } from '../../interfaces/type-file.enum';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit{

  public profileForm!: FormGroup;
  public user:User;
  public uploadImage!: File;
  public previewImage!: string;
  
  private fb = inject( FormBuilder );
  private validatorsService = inject(ValidatorsService);
  private userService = inject(UserService);
  private fileUploadService = inject(FileUploadService);

  constructor(){
    this.user = this.userService.user!;
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: [ this.user.name , [Validators.required] ],
      email: [ this.user.email , [Validators.required, Validators.email, Validators.pattern( this.validatorsService.emailPattern )] ]
    })
  }

  isValidField( field:string){
    return this.validatorsService.isValidField(this.profileForm, field)
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
    const fileUpload = {
      file: this.uploadImage,
      type: TypeFile.user,
      id : this.user._id
    }
    this.fileUploadService.updatePhoto(this.uploadImage, TypeFile.user, this.user._id)
      .subscribe({
        next: (resp) => {
          this.user.img = resp.url,
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Usuario actualizado correctamente',
            showConfirmButton: false,
            timer: 2500
          })
        },
        error: (err) => console.log(err)
      })
  }

  updateProfile(){
    this.userService.updateProfile(this.profileForm.value)
      .subscribe({
        next: ( ) => {
          const { name, email } = this.profileForm.value
          this.user.name = name,
          this.user.email = email,
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Usuario actualizado correctamente',
            showConfirmButton: false,
            timer: 2500
          })
        },
        error: err => {
          Swal.fire('Error', err.error.message, 'error')
        }
      })
  }


}
