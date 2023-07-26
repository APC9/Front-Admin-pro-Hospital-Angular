import { AfterViewInit, Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { ValidatorsService, UserService, SidebarService } from '../../services';
import { environment } from '../../../environments/environments';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit{

  @ViewChild('googleBTN')
  public googleBtn!: ElementRef;

  public loginForm = this.fb.group({
    email: [ localStorage.getItem( 'email' || '' ) , [Validators.required, Validators.email, Validators.pattern( this.validatorsService.emailPattern ) ] ],
    password: [ '', [Validators.required, Validators.minLength(6)]],
    remenber: [ false ]
  })

  public user: any;
  public loggedIn: any;
  private googleCient = environment.googleClient;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private userService:UserService,
    private sidebarService:SidebarService,

    private ngZone: NgZone
    ) {   }

  ngAfterViewInit(): void {
    this.googleInit()
  }

  googleInit(){
    google.accounts.id.initialize({
      client_id: this.googleCient,
      callback: (response: any) => this.handleCredentialResponse(response)
    });

    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  handleCredentialResponse(response:any){
    this.userService.loginGoogle( response )
      .subscribe({
        next: (user ) =>  this.ngZone.run( () => {
            localStorage.setItem('menu', JSON.stringify( user.menu ) )
            this.sidebarService.getMenuItems()
            this.router.navigateByUrl('dashboard')
          }),
        error: err => console.log(err)
      })
  }

  login() {
    if ( this.loginForm.invalid) return;

    this.userService.loginUser( this.loginForm )
    .subscribe({
      next: ( user ) => {
        localStorage.setItem('menu', JSON.stringify( user.menu ) )
        this.loginForm.get('remenber')!.value
          ? localStorage.setItem('email', this.loginForm.get('email')?.value || '' )
          : localStorage.removeItem('email')
          this.router.navigateByUrl('dashboard')
      },
      error: err => {
        console.log(err)
        Swal.fire('Error', err.error.message , 'error')
      }
    })
  }

  isValidField( field:string){
    return this.validatorsService.isValidField(this.loginForm, field)
  }

}
