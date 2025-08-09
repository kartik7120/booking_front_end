export async function fetchNowPlayingMovies() {
    try {
        const res = await fetch(`https://localhost:8080/getnowplayingmovies`,{
            body: JSON.stringify({
                "longitude": 77.5946,
                "latitude": 12.9716,
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