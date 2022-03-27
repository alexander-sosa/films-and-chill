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
	tuple_status?: boolean;
    //last_update?: Timestamp<Timestamp>,
}