// Generated by https://quicktype.io

export interface Hospital {
  _id:      string;
  name:     string;
  isActive: boolean;
  user:     UserHospital;
  img?:     string;
}

export interface UserHospital {
  _id:  string;
  name: string;
}

export interface Hospitals {
  hospital:  Hospital[];
  total: number
}