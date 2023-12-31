// Generated by https://quicktype.io


// Generated by https://quicktype.io

export interface UserLogin {
  user:  User;
  token: string;
  menu:  Menu[];
}

export interface Menu {
  titulo:   string;
  expanded: boolean;
  icono:    string;
  submenu:  Submenu[];
}

export interface Submenu {
  titulo: string;
  url:    string;
}

export interface User {
  _id:      string;
  email:    string;
  name:     string;
  password:     string | undefined;
  roles:    string[] | undefined;
  isActive: boolean | undefined;
  google:   boolean | undefined;
  img:      string | undefined
}

export interface Users {
  users:  User[];
  total: number
} 


/* export interface UserLogin {
  user:  User;
  token: string;
}

export interface User {
  _id:      string;
  email:    string;
  name:     string;
  password:     string | undefined;
  roles:    string[] | undefined;
  isActive: boolean | undefined;
  google:   boolean | undefined;
  img:      string | undefined
}

*/
