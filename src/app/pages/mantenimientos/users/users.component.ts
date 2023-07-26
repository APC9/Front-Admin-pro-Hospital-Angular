import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';
import Swal from 'sweetalert2';

import { User } from '../../../interfaces';
import { UserService, SearchService, ModalImageService } from '../../../services';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit, OnDestroy {

  private userService = inject(UserService);
  private searchService = inject(SearchService);
  private modalImageService = inject( ModalImageService );
  private debouncer: Subject<string> = new Subject<string>();

  public users!: User[] ;
  public usersTemp!: User[] ;
  public from: number = 0;
  public total: number = 0;
  public nroUsers: number = 5;
  public imgSubs!: Subscription;

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {

    this.loadUsers()
    this.imgSubs = this.modalImageService.newImage.subscribe( ()=> this.loadUsers() )

    this.debouncer.pipe(
      debounceTime(300)
    ).subscribe( term => {

      this.searchService.searchUser( term )
      .subscribe({
        next: (resp ) => {
          const {_id, name, email, password, isActive, roles, google, img} = resp
          this.users = [{_id, name, email, password, isActive, roles, google, img } ]
        },
        error: err => console.log(err)
      })

    })
  }

  openModal( user: User ){
    this.modalImageService.openModal(user)
  }

  searchUserByTerm( term: string ){

    if ( term.length  === 0 ) this.users = this.usersTemp;

    this.debouncer.next( term )
  }

  loadUsers(){
    this.userService.loadUsers( this.from.toString() )
      .subscribe({
        next: (resp) => {
          this.users = resp.users,
          this.usersTemp = resp.users,
          this.total = resp.total
        },
        error: (err) => console.log(err)
      })
  }

  changeRoles( user: User){
    this.searchService.changeUserRoles(user)
      .subscribe({
        next: (resp) => {
          Swal.fire(
            'Cambio exitoso',
            `El rol del usuario es: ${user.roles} `,
            'success'
          )
        },
        error: (err) => console.log(err)
      })
  }


  delete(user:User){

    if ( user._id === this.userService.user?._id ){
      Swal.fire('Error', 'No puede Eliminar este Usuario', 'error')
      return;
    }

    Swal.fire({
      title: 'Borrar usuario?',
      text: `Estas apunto de borrar a ${user.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, Borrar'
    }).then( result => {

      this.searchService.deleteUser(user._id)
        .subscribe({
          next: resp => {
            this.loadUsers()
            Swal.fire(
              'Usuario borrado',
              `${user.name} fue eliminido`,
              'success'
            )
          },
          error: err => console.warn(err)
        })
    })
  }

  next(){
    this.from = this.from + 5
    this.nroUsers = this.nroUsers + 5

    if( this.nroUsers > this.total ) {
      this.from = this.from - 5
      this.nroUsers = 10
    }

    this.loadUsers()
  }

  prev(){

    if( this.from < 0 ) return;

    this.from = this.from - 5
    this.nroUsers = this.nroUsers - 5

    if ( this.from > 0 ){
      this.loadUsers()
    }

  }
}
