import { Timestamp } from "rxjs";

export interface Movie{
    movie_id?: number;
    title?: string;
    description?: string;
    release_year?: number;
    cost?: number;
    stock?: number;
	  rating?: string;
	  genre?: string;
	  image_link?: string;
  	tuple_status?: boolean;
    //last_update?: Timestamp<Timestamp>,
}

export interface Genre{
    genre_id?: number,
    genre?: string
}

export interface Rating{
  rating_id?: number,
  rating?: string
}
