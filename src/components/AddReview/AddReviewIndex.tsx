import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import ReviewMovieDetails from "./ReviewMovieDetails";
import AddReviewForm from "./AddReviewForm";

// ✅ Better: Move API URL to environment variable
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

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

export default function AddReviewIndex() {
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
        enabled: !!movieID, // only fetch if movieID is defined
        retry: 2, // retry twice before showing error
    });

    // ✅ Styled loading state
    if (isLoading)
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-gray-700">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-700 mb-4"></div>
                <p className="text-lg font-medium">Loading movie details...</p>
            </div>
        );

    // ✅ Enhanced error handling UI
    if (isError)
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-gray-700">
                <p className="text-red-600 font-semibold text-lg mb-3">
                    {error instanceof Error
                        ? error.message
                        : "Something went wrong while fetching movie details."}
                </p>
                <button
                    onClick={() => refetch()}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    Try Again
                </button>
            </div>
        );

    return (
        <div className="py-8 px-4 sm:px-8">
            <div className="mx-auto space-y-8">
                <ReviewMovieDetails
                    movieTitle={movieDetails.title}
                    moviePosterUrl={movieDetails.poster_url}
                    movieRating={movieDetails.rating || 8.5}
                    movieReleaseDate={movieDetails.release_date}
                />

                <div className=" shadow-md rounded-2xl p-6">
                    <AddReviewForm />
                </div>
            </div>
        </div>
    );
}
