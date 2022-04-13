import { Timestamp } from "rxjs";

export interface Movie{
    movie_id?: number;
    title?: string;
    description?: string;
    release_year?: number;
    cost?: number;
    stock?: number;
    rating_id?: number;
    genre_id?: number;
    image_link?: string;
}

export interface Genre{
    genre_id?: number,
    genre?: string
}

export interface Rating{
  rating_id?: number,
  rating?: string
}
