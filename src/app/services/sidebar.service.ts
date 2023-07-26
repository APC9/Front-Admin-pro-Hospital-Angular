import { Injectable } from '@angular/core';
import { Menu } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu:Menu[] = [];


  getMenuItems(){
    const menuFromLocalStorage = localStorage.getItem('menu')!;
    
    this.menu = JSON.parse(menuFromLocalStorage);
  }

  /*
    menu: any[] = [
    {
      titulo: 'Dashboard',
      expanded: false,
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Main', url: 'dashboard' },
        { titulo: 'Gráficas', url: 'grafica1' },
        { titulo: 'ProgressBar', url: 'progress' },
      ]
    },
    {
      titulo: 'Mantenimiento',
      expanded: false,
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        { titulo: 'Usuarios', url: 'users' },
        { titulo: 'Medicos', url: 'medicos' },
        { titulo: 'Hospitales', url: 'hospitales' },
      ]
    },
  ];

  */

  constructor() { }
}
