import { useNavigate, useParams } from "react-router";
import VideoPlayer from "../components/VideoPlayer";
import { useQuery } from "@tanstack/react-query";
import MovieDetailsTop from "./MovieDetailsTop";
import { formatDuration } from "../utils/util";
import CastCrewList from "../components/CastCrewList";
import MovieReviewSection from "./MovieReviewSection";

async function fetchMovieDetails(id: number) {
    try {
        const res = await fetch(`http://localhost:8080/getMovie/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })

        if (!res.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await res.json();

        return data;
    } catch (error) {
        console.error("Error fetching movie details:", error);
        throw error;
    }
}

interface MovieDetailsResponse {
    title: string;
    description: string;
    duration: number;
    language: string[];
    type: string[];
    cast_crew: {
        name: string;
        character_name: string;
        photourl: string;
    }[];
    poster_url: string;
    trailer_url: string;
    release_date: string;
    movie_resolution: string[];
    votes: number;
    id: number;
}

interface MovieReviewResponse {
    status: 200;
    message: string;
    review_list: review_list;
    totalReviewCount: number;
    totalVotes: number;
}

interface review_list {
    reviews: {
        movieID: number;
        userID: number;
        rating: number;
        comment: string;
        title: string;
        reviewID: string;
        createdAt: string;
        reviewerName: string;
    }[]
}

function calculateAverageRating(reviews: review_list | undefined): number {

    if (!reviews) {
        return 0;
    }

    if (reviews.reviews.length === 0) {
        return 0;
    }

    const totalRating = reviews.reviews.reduce((acc, review) => acc + review.rating, 0);
    return totalRating / reviews.reviews.length;
}

export default function MovieDetails() {

    let { id } = useParams<{ id: string }>();

    const navigate = useNavigate();

    if (!id) {
        return (
            <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
                <h2 className="text-2xl font-semibold mb-4">Movie not found</h2>
                <p className="text-gray-500 mb-6">We couldn’t load the movie details. Please check the URL or try again.</p>
                <button className="btn btn-primary" onClick={() => navigate("/")}>
                    Go to Home
                </button>
            </div>
        );
    }

    const { data: movieDetails, error, status, isError } = useQuery<MovieDetailsResponse>({
        queryKey: ["movieDetails", id],
        queryFn: () => fetchMovieDetails(Number(id)),
        enabled: !!id, // Only run the query if id is available
        refetchOnWindowFocus: false,
        retry: true,
        retryDelay: 1000,
        staleTime: 1000 * 60 * 5, // 5 minutes
    })

    const { data: movieReviews, error: movieReviewResponseError, status: movieReviewResponseStatus, isError: movieReviewResponseIsError } = useQuery<MovieReviewResponse>({
        queryKey: ["movieReviews", id],
        queryFn: () =>
            fetch(`http://localhost:8080/getAllMovieReview/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    limit: 5,
                    offset: 0,
                    sortBy: 0,
                    filterBy: 0,
                }),
            }).then((res) => res.json()),
        enabled: !!id,
        refetchOnWindowFocus: false,
        retry: true,
        retryDelay: 1000,
        staleTime: 1000 * 60 * 5, // 5 minutes
    })

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    if (status === "pending") {
        return <div>Loading...</div>;
    }

    if (status === "success") {
        console.log("Movie Details:", movieDetails);
    }


    // Fetch movie details using the id

    return (
        <div>
            <VideoPlayer videoURL={movieDetails.trailer_url || ""} />
            <div className="divider"></div>
            <div>
                <MovieDetailsTop movieDuration={formatDuration(movieDetails.duration)}
                    movieFormats={movieDetails.movie_resolution}
                    movieGenres={movieDetails.type}
                    movieLanguages={movieDetails.language}
                    releaseDate={movieDetails.release_date}
                    summary={movieDetails.description}
                />
            </div>
            <div className="divider"></div>
            <div className="flex flex-col items-start">
                {movieDetails.cast_crew && movieDetails.cast_crew.length > 0 && (
                    <CastCrewList cast_crew={movieDetails.cast_crew} />
                )}
            </div>
            <div className="divider"></div>
            <div>
                {/* Top 5 reviews */}
                <MovieReviewSection rating={calculateAverageRating(movieReviews?.review_list)} votings={movieReviews?.totalVotes || 0} totalReviews={movieReviews?.totalReviewCount || 0} reviews={
                    movieReviews?.review_list.reviews.map((review) => ({
                        rating: review.rating,
                        reviewDate: new Date().toLocaleDateString(), // will be filled by created_at field in the backend
                        reviewerName: review.reviewerName, // will be filled by user name in the backend
                        reviewId: review.userID.toString() + review.movieID.toString(), // will be filled by user id and movie id in the backend
                        reviewText: review.comment,
                        reviewTitle: review.title,
                    })) || undefined
                } />
            </div>
            <div>
                {/* book tickets button at the bottom of the page absolute */}
                <button className="btn btn-secondary fixed bottom-0 right-0 w-full" onClick={() => {
                    navigate(`/movie/${id}/movieTimeSlots`, {
                        state: {
                            movieDetails: movieDetails,
                        }
                    })
                }}>
                    Book Tickets
                </button>
            </div>
        </div>
    )
}
