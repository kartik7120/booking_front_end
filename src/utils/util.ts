import { v4 as uuidv4 } from 'uuid';
import { UpcomingMovies } from '../components/HomePage/getNowPlayingMovies';

function formatDuration(milliseconds: number) {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60)); // Calculate hours
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60)); // Calculate remaining minutes

    return `${hours} h ${minutes} m`;
}

function generateIdempotentKey(): string {
    return uuidv4(); // Generate a unique idempotent key using UUID
}

// Create a function to sort now playing movies and upcoming movies by their ranking and if not present then by their votes or by their release date

type MovieType = UpcomingMovies;

function sortMovies(movies: MovieType[]): MovieType[] {
    return movies.sort((a, b) => {
        // Sort by ranking first
        if (a.ranking !== b.ranking) {
            return b.ranking - a.ranking; // Higher ranking first
        }
        // If rankings are equal, sort by votes
        if (a.votes !== b.votes) {
            return b.votes - a.votes; // Higher votes first
        }
        // If both ranking and votes are equal, sort by release date
        return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
    });
}

export {
    formatDuration,
    generateIdempotentKey,
    sortMovies
}