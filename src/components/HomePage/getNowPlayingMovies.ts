import { QueryFunctionContext } from "@tanstack/react-query";

export interface Movie {
    id: number;
    title: string;
    description: string;
    duration: number; // in minutes
    language: string[];
    movie_resolution: string[];
    poster_url: string;
    ranking: number;
    release_date: string; // ISO 8601 format with timezone
    type: string[]; // genres
    votes: number;
}

interface CastCrew {
    name: string;
    character_name: string;
    photourl: string;
}

export interface UpcomingMovies {
    title: string;
    description: string;
    duration: number;
    language: string[];
    type: string[];
    cast_crew: CastCrew[];
    poster_url: string;
    release_date: string;
    movie_resolution: string[];
    votes: number;
    ranking: number;
    id: number;
}

export async function fetchNowPlayingMovies() {
    try {
        const res = await fetch(`http://localhost:8080/getnowplayingmovies`, {
            body: JSON.stringify({
                "longitude": 0,
                "latitude": 0,
            }),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Failed to fetch now playing movies');
        }

        console.log('Now Playing Movies:', data);

        return data

    } catch (error) {
        console.error('Error fetching now playing movies:', error);
        throw error;
    }
}

export async function getUpcomingMovies(
    context: QueryFunctionContext<readonly unknown[]>
): Promise<UpcomingMovies[]> {
    const queryKey = context.queryKey as readonly [string, { date: string }];
    const [, { date }] = queryKey;

    const res = await fetch(`http://localhost:8080/getupcomingmovies/${date}`);
    const data = await res.json();

    console.log('Upcoming Movies:', data);

    if (!res.ok) {
        throw new Error(data.message || 'Failed to fetch upcoming movies');
    }

    return data;
}