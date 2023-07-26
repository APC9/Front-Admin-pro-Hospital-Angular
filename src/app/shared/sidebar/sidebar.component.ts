import { Component, inject } from '@angular/core';
import { SidebarService, UserService } from '../../services';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  public userService = inject( UserService );
  public user?: User;
  public expanded: boolean = false;
  public expanded1: boolean = false;
  public expanded2: boolean = false;

  constructor( 
    public sidebarService: SidebarService ) {
    this.user = this.userService.user
  }

  togleExpandedName(){
    this.expanded = !this.expanded 
  }

  togleExpandedDashboard(titulo:string){
    for( let item of this.sidebarService.menu){
      if( item.titulo === titulo ){
        item.expanded = !item.expanded;
      }
    }
  }

  logout(){
    this.userService.logout()
  }

}
