export interface IUser {
  id?: number;
  email: string;
  password: string;
  is_superuser: string;
  is_staff: string;
  is_active: string;
  last_login: string;
  created_at: string;
  updated_at: string;
  profile: IProfile;
}

export interface IProfile {
  id?: number;
  name: string;
  surname: string;
  phone: string;
  born: string;
  avatar: string;
}

export interface IServerResponseUsers {
  total_items: number;
  total_pages: number;
  page_number: number;
  prev: string;
  next: string;
  data: IUser[];
}

