import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  private userService = inject( UserService )
  public user?: User;

  constructor() {
    this.user = this.userService.user
  }

  logout() {
    this.userService.logout();
  }

}
