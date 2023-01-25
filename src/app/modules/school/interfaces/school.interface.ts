export interface ISchool {
  id?: number;
  name: string;
  about: string;
  logo: string;
  homework: string;
  certificate: string;
  internship: string;
  site: string;
  facebook: string;
  instagram: string;
  telegram: string;
  tiktok: string;
  youtube: string;
  cities: ICity[];
  comments: IComment[];
  created_at: string;
  updated_at: string;
}

export interface ICity {
  id?: number;
  name: string;
}

export interface IComment {
  id?: number;
  school_id?: number;
  author: string;
  text: string;
  created_at: string;
  updated_at: string;
}

export interface IServerResponseSchools {
  total_items: number;
  total_pages: number;
  page_number: number;
  prev: string;
  next: string;
  data: ISchool[];
}

