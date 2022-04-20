import { Timestamp } from "rxjs";

export interface Movie{
    movieid?: number;
    title?: string;
    description?: string;
    releaseyear?: number;
    cost?: number;
    stock?: number;
    ratingid?: number;
    genreid?: number;
    imagelink?: string;
}

export interface Genre{
    genreid?: number,
    image?: string, 
    genre?: string
}

export interface Rating{
  ratingid?: number,
  rating?: string
}
