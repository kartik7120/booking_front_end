import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import AllReviewsHeader from './AllReviewsHeader';
import AllReviewCommentSection from './AllReviewCommentSection';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || `${process.env.BROKER_URL}`;

async function GetMovieDetails(movieID: string) {
    const response = await fetch(`${BASE_URL}/getMovie/${movieID}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch movie details");
    }

    return response.json();
}

export default function AllReviewsIndex() {
    const { id: movieID } = useParams();

    const {
        isLoading,
        isError,
        error,
        data: movieDetails,
        refetch,
    } = useQuery({
        queryKey: ["movieDetails", movieID],
        queryFn: () => GetMovieDetails(movieID!),
        enabled: !!movieID,
        retry: 2,
    });

    if (isLoading) {
        return (
            <div className="p-4 space-y-4">
                <div className="h-8 w-1/2 skeleton" />
                <div className="h-96 w-full skeleton" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="p-4 text-center">
                <p className="text-red-500">⚠️ {error instanceof Error ? error.message : "Something went wrong."}</p>
                <button className="btn btn-outline mt-4" onClick={() => refetch()}>
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="p-4 space-y-6">
            <AllReviewsHeader
                movieTitle={movieDetails.title}
                moviePosterUrl={movieDetails.poster_url}
                movieRating={movieDetails.rating || 8.5}
                movieReleaseDate={movieDetails.release_date}
            />
            <AllReviewCommentSection />
        </div>
    );
}
