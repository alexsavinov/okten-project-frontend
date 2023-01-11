export interface ISchool {
  id?: number;
  name: string;
  about: string;
  logo: string;
  cities: ICity[];
  ages?: IAge[];
  learn_formats?: ILearnFormat[];
  created_at: string;
  updated_at: string;
}

export interface ICity {
  id?: number;
  name: string;
}

export interface IAge {
  id?: number;
  name: string;
}

export interface ILearnFormat {
  id?: number;
  name: string;
}

export interface IServerResponseSchools {
  total_items: number;
  total_pages: number;
  page_number: number;
  prev: string;
  next: string;
  data: ISchool[];
}

