import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { SidebarService, UserService, ValidatorsService } from '../../services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent {

  public router = inject( Router );
  public registerForm = this.fb.group({
    name: [ '', [ Validators.required, Validators.minLength(2), Validators.pattern(this.validatorsService.firstNameAndLastnamePattern)] ],

    email: [ '', [Validators.required, Validators.email, Validators.pattern( this.validatorsService.emailPattern ) ] ],
    password: [ '', [Validators.required, Validators.minLength(6)]],
    password2: [ '', [Validators.required ]],
    terms: [ false, [Validators.requiredTrue] ],
  },{
    validators:[
      this.validatorsService.isFieldOneEqualFieldTwo('password', 'password2')
    ]
  })

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private userService:UserService,
    private sidebarService:SidebarService,
  ) { }

  isValidField( field:string){
    return this.validatorsService.isValidField(this.registerForm, field)
  }

  createdUser(){
    if(this.registerForm.invalid ) return;
    this.userService.createUser( this.registerForm )
      .subscribe({
        next: (user) => {
          localStorage.setItem('menuLocal', JSON.stringify( user.menu ) )
          this.sidebarService.getMenuItems()
          this.router.navigateByUrl('dashboard'),
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Usuario creado correctamente',
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
