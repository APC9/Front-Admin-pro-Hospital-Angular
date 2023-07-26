import { Component, OnInit, inject } from '@angular/core';
import { SettingsService, SidebarService } from '../services';

//declare function customInitFunctions();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit{


  public year: number = new Date().getFullYear()
  public sidebarService = inject(SidebarService)

  constructor( 
    private settingsService: SettingsService
    ) { }

  ngOnInit(): void {
    //customInitFunctions();
    this.sidebarService.getMenuItems()
  }

}
