import { Component } from '@angular/core';
import { SettingsService } from '../../services';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent {

  constructor( private settingsService: SettingsService  ) {}

  ngOnInit(): void {
    this.settingsService.checkCurrentTheme();
  }

  changeTheme( theme: string ) {

    this.settingsService.changeTheme( theme );

  }


}
