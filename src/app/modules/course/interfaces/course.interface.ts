export interface ICourse {
  id?: number;
  name: string;
  ages?: IAge[];
  learn_formats?: ILearnFormat[];
  created_at: string;
  updated_at: string;
}

export interface IAge {
  id?: number;
  name: string;
}

export interface ILearnFormat {
  id?: number;
  name: string;
}

export interface IServerResponseICourses {
  total_items: number;
  total_pages: number;
  page_number: number;
  prev: string;
  next: string;
  data: ICourse[];
}

