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


export async function fetchNowPlayingMovies() {
    try {
        const res = await fetch(`http://localhost:8080/getnowplayingmovies`,{
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

export const getUpcomingMovies = async ({
    queryKey,
}: {
    queryKey: [string, { date: string; }];
}
) => {
    try {
        const res = await fetch(`https://localhost:8080/getupcomingmovies/${queryKey[1].date}`);

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Failed to fetch upcoming movies');
        }

        return data.map((movie: any) => ({
            title: movie.title,
            genreTags: movie.genreTags,
            rating: movie.rating,
            summary: movie.summary,
            duration: movie.duration,
            releaseYear: movie.releaseYear,
            cast_crew: movie.cast_crew.map((member: any) => ({
                name: member.name,
                character_name: member.character_name,
                photourl: member.photourl
            }))
        }));

    } catch (error) {
        console.error('Error fetching upcoming movies:', error);
        throw error;
    }
}