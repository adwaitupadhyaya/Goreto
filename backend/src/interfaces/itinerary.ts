export interface IItinerary {
  id: string;
  created_by: string;
  title: string;
  description: string;
  number_of_days: number;
  difficulty: string;
  path: string[];
  photo_url?: string;
}

export interface GetItineraryQuery {
  title?: string;
  filter?: string;
}

export interface ItineraryImage {
  photo?: string;
}
