export interface Location {
  id: number;
  name: string;
  code: string;
  image?: string | null;
  created_at: string;
  updated_at: string;
}

export interface LocationFilters {
  name?: string;
  code?: string;
  page?: number;
  per_page?: number;
    filters?: {
    name?: string;
    code?: string;
  };
}
